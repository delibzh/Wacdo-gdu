const mongoose = require("mongoose");

const menuSchema = mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: {
      type: String,
      enum: ["Menu", "Formule", "Offre"],
      required: true,
    },
    available: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema);
