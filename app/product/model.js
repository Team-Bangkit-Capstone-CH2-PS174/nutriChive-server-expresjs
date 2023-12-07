const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  image: String,
  name: String,
});

const productSchema = new mongoose.Schema({
  nama: String,
  image: String,
  categori: String,
  description: String,
  ingredients: [ingredientSchema],
  step: [String],
});

const productFavoriteSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Product = mongoose.model('Product', productSchema);
const Favorite = mongoose.model('Favorite', productFavoriteSchema);

module.exports = { Product, Favorite };
