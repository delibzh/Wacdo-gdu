const mongoose = require("mongoose");
const Menu = require("../models/Menu");
const menuSchema = mongoose.Schema({});

exports.createMenu = async (req, res, next) => {
  // admin uniquement
  try {
    const menu = new Menu({ ...req.body });
    await menu.save();
    res.status(201).json({ message: "menu crée" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getAllMenus = async (req, res, next) => {
  //tout les roles
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
  } catch (error) {
    res.status(400).json({ error: "Menu non trouvé" });
  }
};

exports.getOneMenu = async (req, res, next) => {
  // obtenir menu par id
  try {
    const menuById = await Menu.findById(req.params.id);
    res.status(200).json(menuById);
  } catch (error) {
    res.status(404).json({ error: "  Menu non trouvé" });
  }
};

exports.modifyMenu = async (req, res, next) => {
  // modifier menu, admin uniquement
  try {
    await Menu.updateOne(
      { _id: req.params.id },
      { ...req.body, _id: req.params.id }
    );
    res.status(200).json({ message: "Menu Modifié " });
  } catch (error) {
    res.status(400).json({ error: "Modification Impossible" });
  }
};

exports.deleteMenu = async (req, res, next) => {
  // supprimé menu (admin )
  try {
    const menu = await Menu.findOne({ _id: req.params.id });
    if (!menu) {
      return res.status(404).json({ error: "Menu non trouvé" });
    }
    await Menu.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Menu supprimé" });
  } catch (error) {
    res.status(400).json({ error: " Suppression impossible" });
  }
};
