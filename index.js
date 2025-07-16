const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(express.json());

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Connexion à MongoDB avec l'URL stockée dans le fichier .env
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("  Connecté à MongoDB Atlas"))
  .catch((err) => console.error("  Erreur de connexion MongoDB :", err));

// Route de test pour vérifier que le serveur fonctionne

app.use(cors());
// ROUTE TEST :
app.get("/", (req, res) => {
  res.send("connexion au serveur OK ");
});
// ROUTES API :
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);

// Démarrage du serveur sur le port 3000
app.listen(3000, () => {
  console.log("Serveur lancé sur localhost:3000");
});

module.exports = app;
