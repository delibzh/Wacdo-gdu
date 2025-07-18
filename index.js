const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

require("dotenv").config();
app.use(express.json());
const { errorHandler } = require("./controllers/errorHandler");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const menuRoutes = require("./routes/menuRoutes");

const swaggerSetup = require("./config/swaggerConfig");

swaggerSetup(app);

// Connexion à MongoDB avec l'URL stockée dans le fichier .env
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("  Connecté à MongoDB Atlas"))
  .catch((err) => console.error("  Erreur de connexion MongoDB :", err));

app.use(helmet()); // plugin sécu

const corsOptions = {
  // origin, methods..etc
};

app.use(cors()); // sécu qui cible API que par une url précise ( par exemple http://monfrontend.com)

const limiter = rateLimit({
  // permet de limiter les requetes pour utilisateurs
  windowMs: 15 * 60 * 1000, //15min
  max: 100, // 100 requete
  message: " Trop de requètes",
});

app.use(limiter);

// ROUTE TEST :
app.get("/", (req, res) => {
  res.send("connexion au serveur OK ");
});
// ROUTES API :
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/menus", menuRoutes);

app.use(errorHandler);

// Démarrage du serveur sur le port 3000
app.listen(3000, () => {
  console.log("Serveur lancé sur localhost:3000");
});

module.exports = app;
