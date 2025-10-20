// Gestions des erreurs simplifié :

exports.errorHandler = (err, res) => {
  console.error("Erreur capturée", err.message);

  // Erreur Défault : interne au serveur :
  const status = err.status || 500;
  const message = err.message || "Erreur Interne du Serveur";

  // Différentes erreurs du projet :
  // Erreur Mongoose ID INVALIDE  :
  if (err.name === "CastError") {
    return res.status(400).json({ message: "ID Invalide" });
  }
  // Erreur de validation mongoose :
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }
  // Erreur JWT
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Token Invalide " });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Session Expirée" });
  }
  // réponse générique :
  res.status(status).json({
    status,
    message,
  });
};
