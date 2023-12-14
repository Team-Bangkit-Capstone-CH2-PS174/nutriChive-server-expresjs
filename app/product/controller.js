const { Product,Favorite } = require('./model');
const bcrypt = require('bcryptjs')

module.exports = {
  listProduk: async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 99;
        const skip = (page - 1) * limit;

        // Retrieve products and total count from the database
        const [products, totalCount] = await Promise.all([
            Product.find().skip(skip).limit(limit).exec(),
            Product.countDocuments().skip(skip).limit(limit), // Count total number of documents based on the same skip and limit
        ]);

        res.status(200).json({
            data: products,
            totalCount: totalCount,
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Internal server error' });
    }
},

    listProdukDetail: async (req, res) => {
      try {
          const { id } = req.params;
          const product = await Product.findById({ _id: id });
          res.status(200).json(product);

          
      } catch (err) {
          res.status(500).json({message: err.message || 'internal server error'});
      }
  },
  listProdukSearch: async (req, res) => {
    try {
      // Extract search parameters from the request query
      const { keyword } = req.query;
  
      // Define a basic query to find all products
      let query = {};
  
      // If a keyword is provided, add a search condition
      if (keyword) {
        query = {
          $or: [
            { name: { $regex: new RegExp(keyword, 'i') } }, // Case-insensitive name search
            { categori: { $regex: new RegExp(keyword, 'i') } }, // Case-insensitive category search
            { 'ingredients.name': { $regex: new RegExp(keyword, 'i') } }, // Case-insensitive ingredient name search
            // Add more fields to search if needed
          ],
        };
      }
  
      // Use the query to find products
      const products = await Product.find(query);
  
      res.status(200).json({ data: products });
    } catch (err) {
      res.status(500).json({ message: err.message || 'Internal server error' });
    }
  },
  
  favorite: async (req, res) => {
    try {
      const body = req.body;
      const userId = req.user._id;
      const productId = body.product;
  
      // Check if the favorite already exists for the user and product
      const existingFavorite = await Favorite.findOne({ user: userId, product: productId });
  
      if (existingFavorite) {
        return res.status(400).json({
          message: 'Favorite already exists for this user and product.',
        });
      }
  
      // If the favorite does not exist, save it
      const payload = {
        user: userId,
        product: productId,
      };
  
      const favorite = new Favorite(payload);
      await favorite.save();
  
      res.status(201).json({
        data: favorite,
      });
    } catch (error) {
      res.status(500).json({ message: error.message || 'Internal server error' });
    }
  },
  unfavorite: async (req, res) => {
    try {
      const body = req.body;
      const userId = req.user._id;
      const productId = body.product;
  
      // Check if the favorite exists for the user and product
      const existingFavorite = await Favorite.findOne({ user: userId, product: productId });
  
      if (!existingFavorite) {
        return res.status(404).json({
          message: 'Favorite not found for this user and product.',
        });
      }
  
      // If the favorite exists, remove it
      await existingFavorite.remove();
  
      res.status(200).json({
        message: 'Unfavorited successfully.',
      });
    } catch (error) {
      res.status(500).json({ message: error.message || 'Internal server error' });
    }
  },
  
  listFavSearch: async (req, res) => {
    try {
      const userId = req.user._id;
      // Extract search parameters from the request query
      const { id_product } = req.query;
  
      // Define a basic query to find all products
      let query = {};
  
      // If a keyword is provided, add a search condition
      if (id_product) {
        query = {
          $or: [
            { product: id_product },
            // Add more fields to search if needed
          ],
        };
      }
  
      // Use the query to find products
      const favorite = await Favorite.find({ user: userId, ...query });
  
      res.status(200).json({ data: favorite });
    } catch (err) {
      res.status(500).json({ message: err.message || 'Internal server error' });
    }
  },
  

   
}
