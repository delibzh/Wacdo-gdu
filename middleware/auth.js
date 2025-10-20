const jwt = require("jsonwebtoken");

module.exports.auth = (req, res, next) => {
  try {
    // vérifier l'entete authorization
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    ) {
      return res.status(401).json({ error: "Token manquant ou invalide" });
    }
    // Extrait le token en supprimant "Bearer " (les 7 premiers caractères)
    const token = req.headers.authorization.split(" ")[1];
    // Vérifie et décode le token avec la clé secrète
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // Extrait userId et role du token décodé
    const { userId, role } = decodedToken;
    if (!userId || !role) {
      return res.status(401).json({ error: " Token Manquant" });
    }
    //Ajoute userId et role à req.auth pour les utiliser dans les controllers ou autres middlewares
    req.auth = { userId, role };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.restrictTo = (roles) => {
  return (req, res, next) => {
    console.log("Role depuis token:", req.auth.role);
    //vérifié si le role de l'user (sotcké dans req.auth.role) est dans la liste des role autorisée
    if (!req.auth || !roles.includes(req.auth.role)) {
      return res
        .status(403)
        .json({ error: "Accès interdit, rôle non autorisé" });
    }

    // si le role est autorisé, passe à la prochaine étape
    next();
  };
};
