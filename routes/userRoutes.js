const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");

router.post("/register", userCtrl.register); // route pour inscription
router.post("/login", userCtrl.login); // route pour connexion

router.post();

module.exports = router;
