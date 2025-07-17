const Product = require("../models/Product");
const fs = require("fs");

exports.createProduct = async (req, res, next) => {
  try {
    const productObject = req.body; // Pas besoin de JSON.parse
    console.log("recu pour création de produit:", req.body);
    const product = new Product({
      ...productObject,
      userId: req.auth.userId,
    });

    await product.save();
    res.status(201).json({ message: "Produit enregistré" });
  } catch (error) {
    next(error);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

exports.getOneProduct = async (req, res, next) => {
  try {
    const productById = await Product.findById(req.params.id);
    if (!productById) {
      const error = new Error("Produit Introuvable");
      error.status = 404;
      return next(error);
    }

    res.status(200).json(productById);
  } catch (error) {
    next(error);
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
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      const error = new Error("Produit Introuvable");
      error.status = 404;
      return next(error);
    }
    if (product.userId !== req.auth.userId) {
      const error = new Error("Non autorisé");
      error.status = 401;
      return next(error);
    }
    //sécuriser le split :
    if (product.imageUrl) {
      const filename = product.imageUrl.split("/images/")[1]; // prendre le deuxieme morceau du lien après découpage : 0 = premier morceau, 1 = deuxieme morceau
      if (filename) {
        await fs.unlink(`images/${filename}`);
      }
    }
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Produit Supprimé" });
  } catch (error) {
    next(error);
  }
};
