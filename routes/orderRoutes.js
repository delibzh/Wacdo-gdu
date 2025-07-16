const express = require("express");
const router = express.Router();
const { auth, restrictTo } = require("../middleware/auth");

// test  route protégée pour commande :
router.post("/", auth, restrictTo(["admin", "accueil"]));
router.get("/", auth, restrictTo(["admin", "accueil", "preparation"]));
router.put("/:id", auth, restrictTo(["admin", "accueil", "preparation"]));
router.delete("/id:", auth, restrictTo(["admin"]));

module.exports = router;
