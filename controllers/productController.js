const Product = require("../models/Product");
const fs = require("fs");

exports.createProduct = async (req, res, next) => {
  try {
    console.log("recu pour création de produit:", req.body);
    const productObject = JSON.parse(req.body.product);
    delete productObject._id;
    delete productObject.userId;
    const product = new Product({
      ...productObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    });
    await product.save();
    res.status(201).json({ message: "Objet Enregistré" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.getOneProduct = async (req, res, next) => {
  try {
    const productById = await Product.findById(req.params.id);
    res.status(200).json(productById);
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.modifyProduct = async (req, res, next) => {
  try {
    const productObject = req.file // // Si un fichier est envoyé, on met à jour l'image, sinon on prend juste le body
      ? {
          ...JSON.parse(req.body.product),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };

    delete productObject._userId; /// On retire le champ _userId s'il existe

    const product = await Product.findOne({ _id: req.params.id }); // On récupère le produit à modifier dans la base
    if (product.userId != req.auth.userId) {
      // On vérifie que l'utilisateur connecté est bien le propriétaire du produit
      return res.status(401).json({ message: "Non autorisé" });
    }
    await Product.updateOne(
      // On met à jour le produit avec les nouvelles données
      { _id: req.params.id },
      { ...productObject, _id: req.params.id }
    );
    res.status(200).json({ message: "Objet modifié" }); // On renvoie une confirmation
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (product.userId != req.auth.userId) {
      return res.status(401).json({ message: "Non autorisé" });
    }
    const filename = product.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`, async () => {
      await Product.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "Objet supprimé" });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
