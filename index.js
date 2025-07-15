const express = require("express");
const mongoose = require("mongoose");
const app = express();
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");
require("dotenv").config();

// Connexion à MongoDB avec l'URL stockée dans le fichier .env
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("  Connecté à MongoDB Atlas"))
  .catch((err) => console.error("  Erreur de connexion MongoDB :", err));

// Route de test pour vérifier que le serveur fonctionne

app.use(cors());

app.get("/", (req, res) => {
  res.send("connexion au serveur OK ");
});

app.use("/api/products", productRoutes);

// Démarrage du serveur sur le port 3000
app.listen(3000, () => {
  console.log("Serveur lancé sur localhost:3000");
});

module.exports = app;
