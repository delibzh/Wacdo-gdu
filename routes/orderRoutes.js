const express = require("express");
const router = express.Router();
const { auth, restrictTo } = require("../middleware/auth");
const orderCtrl = require("../controllers/orderController");

// test  route protégée pour commande :
router.post("/", auth, restrictTo(["admin", "accueil"]), orderCtrl.createOrder);
router.get(
  "/:id",
  auth,
  restrictTo(["admin", "accueil", "preparation"]),
  orderCtrl.getOrderById
);
router.put(
  "/:id",
  auth,
  restrictTo(["admin", "accueil", "preparation"]),
  orderCtrl.updateOrder
);
router.delete("/:id", auth, restrictTo(["admin"]), orderCtrl.deleteOrder);

module.exports = router;
