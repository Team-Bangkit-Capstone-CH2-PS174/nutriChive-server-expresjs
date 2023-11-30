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
module.exports = mongoose.model('Product', productSchema)