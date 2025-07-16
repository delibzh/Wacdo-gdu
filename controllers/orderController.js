const Order = require("../models/Order");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); // => génération de code unique pour les commandes.

exports.createOrder = async (req, res, next) => {
  try {
    //récuperer des données envoyés
    const { products, clientInfo, totalPrice } = req.body;

    //validation simple
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ message: "la liste des produits est obligatoire" });
    }
    //générer un orderId Unique:
    const orderId = uuidv4();
    // créer la commande avec status "pending " par défault
    const newOrder = new Order({
      orderId,
      products,
      clientInfo,
      totalPrice,
      status: "en attente",
      createdat: new Date(),
    });
    //enregistrer la commande en base
    await newOrder.save();
    // répondre avec la commande créer :
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Erreur création commande :", error);
    res
      .status(500)
      .json({ error: "erreur serveur lors de la création de la commande." });
  }
};
exports.getAllOrders = (req, res, next) => {
  Order.find()
    .then((orders) => res.status(200).json(orders))
    .catch((error) => res.status(404).json({ error }));
};

exports.getOrderById = (req, res, next) => {
  Order.findOne({ orderId: req.params.id })
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: " commande non trouvée" });
      }
      res.status(200).json(order);
    })
    .catch((error) => res.status(500).json({ message: "erreur serveur" }));
};
exports.updateOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const updateData = req.body;
    //validation du statut :
    if (
      updateData.status &&
      !["en attente", "préparation", "prête", "servie", "annulée"].includes(
        updateData.status
      )
    ) {
      return res.status(400).json({ message: "statut invalide" });
    }

    const updatedOrder = await Order.findOneAndUpdate({ orderId }, updateData, {
      new: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "erreur serveur", error });
  }
};

exports.deleteOrder = async (req, res, next) => {
  const ordeId = req.params.id;

  try {
    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ message: "commande non trouvée" });
    }
    //vérifier l'autorisation :
    if (order.userId.toString() !== req.auth.userId) {
      return res.status(401).json({ message: "Non autorisé" });
    }
    // supprimé image si présente :
    if (order.imageUrl) {
      const filename = order.imageUrl.split("/images")[1];
      try {
        await fs.unlink(`images/${filename}`);
      } catch (error) {
        console.error("erreur lors de la récupération de l'image");
      }
    }
    await Order.deleteOne({ orderId });
    res.status(200).json({ message: "commande supprimée" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
