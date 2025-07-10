const Product = require("../models/product");

// récupérer tous les produits :
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erreur Serveur" });
  }
};

module.exports = { getAllProducts };
