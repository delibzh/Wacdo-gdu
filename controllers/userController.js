const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
    //récupérer les données envoyé ( username, mdp, role, )
    const { username, password, role } = req.body;

    //vérifier si les champs obligatoire sont présents
    if (!username || !password || !role) {
      return res.status(400).json({ error: "Informations requises" });
    }

    //vérifier si l'username extiste déja
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "username déja utilisé" });
    }

    // créer un nouvel utilisateur :
    const user = new User({ username, password, role });
    await user.save();
    //renvoi une confirmation
    res.status(201).json({ message: "Utilisateur crée", user: { user, role } });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
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
    //renvoyer le token et les infos de l'user :
    res.status(200).json({ token, user: { username, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
