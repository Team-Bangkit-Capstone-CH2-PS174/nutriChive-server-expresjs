const Product = require('./model')
const bcrypt = require('bcryptjs')

module.exports = {
    listProduk: async (req, res) => {
        try {
          const page = parseInt(req.query.page) || 1; 
          const limit = parseInt(req.query.limit) || 99;
          const skip = (page - 1) * limit;
          const products = await Product.find().skip(skip).limit(limit);
          res.status(200).json({data:products});
         

        } catch (err) {
            res.status(500).json({message: err.message || 'internal server error'})
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
  

   
}
