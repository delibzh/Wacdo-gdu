const Product = require("../models/Product");
const fs = require("fs").promises;

exports.createProduct = async (req, res, next) => {
  try {
    const productObject = req.body;
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
    const productObject = req.file
      ? {
          ...JSON.parse(req.body.product),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };

    delete productObject._userId;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produit introuvable" });
    }

    await Product.updateOne(
      { _id: req.params.id },
      { ...productObject, _id: req.params.id }
    );
    res.status(200).json({ message: "Produit modifié" });
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

    //sécuriser le split :
    if (product.imageUrl) {
      const filename = product.imageUrl.split("/images/")[1]; // prendre le deuxieme morceau du lien après découpage : 0 = premier morceau, 1 = deuxieme morceau
      if (filename) {
        // si filename (ex: "pizza.jpg") existe et n'est pas vide :
        await fs.unlink(`images/${filename}`); // on attend que l'action est fini avec de continuer ( iici la supprssion avec fs.unlink) et avec ceci `images/${filename}` on assemble le chemin du fichier à supprimé ex : fs.unlink("images/pizza.jpg")
      }
    }
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Produit Supprimé" });
  } catch (error) {
    next(error);
  }
};
