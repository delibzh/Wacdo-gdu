const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/productController");
const { auth, restrictTo } = require("../middleware/auth");

router.get("/", auth, productCtrl.getAllProducts); // lecture ouverte
router.get("/:id", auth, productCtrl.getOneProduct); // lecture ouverte
router.post("/", auth, restrictTo(["admin"]), productCtrl.createProduct); // admin
router.put("/:id", auth, restrictTo(["admin"]), productCtrl.modifyProduct); // admin
router.delete("/:id", auth, restrictTo(["admin"]), productCtrl.deleteProduct); // admin

module.exports = router;

// rappel :
// "/" correspond à la racine de la ressource( par exmple ici /product) , utilisé pour les opérations sur la collection entière

// ":id" paramètre dynamique qui représente l'identifiant , d'un élément précis (  modifier ou supprimer certain en particulier )
