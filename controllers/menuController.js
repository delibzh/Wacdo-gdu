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
    next(error);
  }
};

exports.getAllMenus = async (req, res, next) => {
  //tout les roles
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
  } catch (error) {
    next(error);
  }
};

exports.getOneMenu = async (req, res, next) => {
  // obtenir menu par id
  try {
    const menuById = await Menu.findById(req.params.id);
    res.status(200).json(menuById);
  } catch (error) {
    next(error);
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
    next(error);
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
    next(error);
  }
};
