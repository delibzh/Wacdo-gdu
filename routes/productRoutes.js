const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/productController");
const { auth, restrictTo } = require("../middleware/auth");
const upload = require("../middleware/multer-config");

// Routes Produits :

router.get("/", auth, productCtrl.getAllProducts);
router.get("/:id", auth, productCtrl.getOneProduct);
router.post(
  "/",
  auth,
  restrictTo(["admin"]),
  upload,
  productCtrl.createProduct
); // admin
router.put("/:id", auth, restrictTo(["admin"]), productCtrl.modifyProduct); // admin
router.delete("/:id", auth, restrictTo(["admin"]), productCtrl.deleteProduct); // admin

module.exports = router;

// rappel :
// "/" correspond à la racine de la ressource( par exmple ici /product) , utilisé pour les opérations sur la collection entière

// ":id" paramètre dynamique qui représente l'identifiant , d'un élément précis (  modifier ou supprimer certain en particulier )
