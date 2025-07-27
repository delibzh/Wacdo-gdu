const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res, next) => {
  try {
    //récupérer les données envoyé ( username, mdp, email, )
    const { username, password, email } = req.body;

    //vérifier si les champs obligatoire sont présents
    if (!username || !password || !email) {
      return res.status(400).json({ error: "Informations requises" });
    }

    //vérifier si l'username extiste déja
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "username déja utilisé" });
    }

    // créer un nouvel utilisateur :
    const user = new User({ username, password, email, role: "client" });
    await user.save();
    // renvoyer  les infos de l'user ( sans le token ou mdp hashé) :
    res.status(201).json({
      message: "Utilisateur créé",
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
        _id: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res) => {
  try {
    //récupérer username et mdp
    const { username, password } = req.body;
    //vérifier si les champs sont fournis (User.js)
    if (!username || !password) {
      return res.status(400).json({ error: "identifiant et MDP requis!" });
    }
    //chercher utilisateur par username:
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé!" });
    }
    // vérifier le mpd :
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Mot de passe incorrecte!" });
    }

    //généré un token jwt avec l'userId, et role:
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    //renvoyer  les infos de l'user ( sans le token ou mdp hashé) :
    res.status(200).json({
      message: "Connexion réussie",
      token,
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
        _id: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

exports.deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // autoriser la suppression si c'est l'utilisateur lui-même ou un admin
    if (user._id.toString() !== req.auth.userId && req.auth.role !== "admin") {
      return res.status(401).json({ message: "non autorisé" });
    }

    await User.deleteOne({ _id: req.params.body });
    res.status(200).json({ message: "utilisateur supprimé" });
  } catch (error) {
    next(error);
  }
};
