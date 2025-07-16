const express = require("express");
const router = express.Router();
const menuCtrl = require("../controllers/menuController");
const { auth, restrictTo } = require("../middleware/auth");

router.get("/", auth, menuCtrl.getAllMenus); // lecture tous les menus
router.get("/:id", auth, menuCtrl.getOneMenu); // lecture un menu par id
router.delete("/:id", auth, restrictTo(["admin"]), menuCtrl.deleteMenu); // admin
router.post("/", auth, restrictTo(["admin"]), menuCtrl.createMenu); // admin
router.put("/:id", auth, restrictTo(["admin"]), menuCtrl.modifyMenu); // admin

module.exports = router;
