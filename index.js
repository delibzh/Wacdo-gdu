// Charge les variables d'environnement depuis le fichier .env (comme MONGO_URI)
require("dotenv").config();

// Importe Express, un framework pour créer un serveur web
const express = require("express");

// Importe Mongoose, une bibliothèque pour interagir avec MongoDB
const mongoose = require("mongoose");

// Initialise l'application Express
const app = express();

// Connexion à MongoDB avec l'URL stockée dans le fichier .env
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" ✅ Connecté à MongoDB Atlas"))
  .catch((err) => console.error(" ❌ Erreur de connexion MongoDB :", err));

// Route de test pour vérifier que le serveur fonctionne
app.get("/", (req, res) => {
  res.send("connexion au serveur OK ");
});

// Démarrage du serveur sur le port 3000
app.listen(3000, () => {
  console.log("Serveur lancé sur localhost:3000");
});
