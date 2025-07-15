const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true }, // string car uuidv4() génère une string
    products: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    ],
    clientInfo: { type: Object, required: false },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["en attente", "préparation", "prête", "servie", "annulée"],
      default: "en attente",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
