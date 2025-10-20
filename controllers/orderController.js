const Order = require("../models/Order");
const fs = require("fs").promises;

exports.createOrder = async (req, res, next) => {
  try {
    const { products, clientInfo, totalPrice } = req.body;
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ message: "La liste des produits est obligatoire" });
    }

    const newOrder = new Order({
      products,
      clientInfo,
      totalPrice,
      status: "en attente",
      createdAt: new Date(),
    });

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

exports.getAllOrders = async (res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    if (
      updateData.status &&
      !["en attente", "préparation", "prête", "servie", "annulée"].includes(
        updateData.status
      )
    ) {
      return res.status(400).json({ message: "Statut invalide" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

exports.deleteOrder = async (req, res, next) => {
  const id = req.params.id;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    // Supprimer image si présente
    if (order.imageUrl) {
      const filename = order.imageUrl.split("/images/")[1];
      try {
        await fs.unlink(`images/${filename}`);
      } catch (error) {
        console.error("Erreur lors de la suppression de l'image", error);
      }
    }
    await Order.findByIdAndDelete(id);
    res.status(200).json({ message: "Commande supprimée" });
  } catch (error) {
    next(error);
  }
};
