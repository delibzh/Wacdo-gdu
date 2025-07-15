const Product = require("../models/Product");
const fs = require("fs");

exports.createProduct = (req, res, next) => {
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

  product
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré" });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .then((products) => res.status(200).json(products))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyProduct = (req, res, next) => {
  const productObject = req.file
    ? {
        ...JSON.parse(req.body.product),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete productObject._userId;

  Product.findOne({ _id: req.params.id })
    .then((product) => {
      if (product.userId != req.auth.userId) {
        return res.status(401).json({ message: "Non autorisé" });
      }
      Product.updateOne(
        { _id: req.paramas.id },
        { ...productObject, _id: req.params.id }
      )
        .then(() => res.status(200).json({ message: " Objet Modidifié" }))
        .catch((error) => res.status(401).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};
exports.getOneProduct = (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => res.status(200).json(product))
    .catch((error) => res.status(404).json({ error }));
};

exports.deleteProduct = (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => {
      if (product.userId != req.auth.userId) {
        res.status(401).json({ message: " non autorisé" });
      } else {
        const filename = product.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Product.deleteOne({ _id: req.params.id }).then(() => {
            res
              .status(200)
              .json({ message: "objet supprimé" })
              .catch((error) => res.status(401).json({ error }));
          });
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
