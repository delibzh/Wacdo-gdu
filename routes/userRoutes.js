const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");
const { auth, restrictTo } = require("../middleware/auth");

router.post("/register", userCtrl.register); // route pour inscription
router.post("/login", userCtrl.login); // route pour connexion
router.get("/users", auth, restrictTo(["admin"]), userCtrl.getAllUsers); // récupérer tout les users.

module.exports = router;
