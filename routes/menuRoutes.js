const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/menuController");
const app = express();

router.get("/", productCtrl.getAllProducts);
router.get("/:id", productCtrl.getOneProduct);
router.delete("/:id", productCtrl.deleteProduct);
router.post("/", productCtrl.createProduct);
router.put("/", productCtrl.modifyProduct);

module.exports = router;
