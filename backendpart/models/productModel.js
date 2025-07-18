const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category: {
    type: String,
    required: true,
    enum: [
      "leafy greens",
      "root vegetables",
      "fruiting vegetables",
      "seasonal vegetables"
    ],
    lowercase: true
  },
  image: String,
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
