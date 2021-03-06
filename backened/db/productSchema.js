const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_image: {
    type: String,
    required: true,
  },
  product_desc: {
    type: String,
    required: true,
  },
  product_rating: {
    type: Number,
    required: true,
  },
  product_producer: {
    type: String,
    required: true,
  },
  product_cost: {
    type: Number,
    required: true,
  },
  product_stock: {
    type: String,
    required: true,
  },
  product_material: {
    type: String,
    required: true,
  },
  color_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "color",
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("product", ProductSchema);
