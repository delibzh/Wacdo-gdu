const express = require("express");
const router = express.Router();
const menuCtrl = require("../controllers/menuController");
const app = express();

router.get("/", auth, menuCtrl.getAllMenus);
router.get("/", auth, menuCtrl.getOneMenu);
router.delete("/:id", auth, restrictTo(["admin"]), menuCtrl.deleteMenu);
router.post("/", auth, restrictTo(["admin"]), menuCtrl.createMenu);
router.put("/:id", auth, restrictTo(["admin"]), menuCtrl.modifyMenu);

module.exports = router;
s;
