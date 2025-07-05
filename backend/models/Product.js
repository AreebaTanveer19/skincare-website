const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: String,
  price: { type: Number, required: true },
  image: String,
  category: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema); 