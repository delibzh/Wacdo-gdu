const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  avaible: { type: Boolean, default: true },
});

module.exports = mongoose.model("Product", productSchema);
