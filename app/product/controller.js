const Product = require('./model')
const bcrypt = require('bcryptjs')

module.exports = {
    listProduk: async (req, res) => {
        try {
          const products = await Product.find();
          res.status(200).json({data:products});
         

        } catch (err) {
            res.status(500).json({message: err.message || 'internal server error'})
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
