const jwt = require("jsonwebtoken");

// fonction pour vérifier si le token est présent et valide
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // format Bearer token
  if (!token) {
    return res.status(401).json({ message: "Accès refusé. Token manquant." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // injecter les infos de l'utitisateur dans la requête
    next(); // passe au contrôleur ou au prochain middleware
  } catch (err) {
    res.status(403).json({ message: "Token Invalide" });
  }
};

module.exports = verifyToken;
