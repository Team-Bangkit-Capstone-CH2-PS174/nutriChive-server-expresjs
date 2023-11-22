
const bcrypt = require('bcryptjs')
module.exports = {
    listProduk: async (req, res) => {
        try {
            const data = [
                {
                    "id": 1,
                    "nama": "Nasi Goreng",
                    "image": "https://example.com/images/nasi_goreng.jpg",
                    "categori": "Makanan Utama",
                    "description": "https://www.example.com/nasi-goreng-tutorial"
                  },
                  {
                    "id": 2,
                    "nama": "Pizza",
                    "image": "https://example.com/images/pizza.jpg",
                    "categori": "Makanan Ringan",
                    "description": "https://www.example.com/pizza-tutorial"
                  },
                  {
                    "id": 3,
                    "nama": "Sushi",
                    "image": "https://example.com/images/sushi.jpg",
                    "categori": "Makanan Jepang",
                    "description": "https://www.example.com/sushi-tutorial"
                  },
                  {
                    "id": 4,
                    "nama": "Salad Buah",
                    "image": "https://example.com/images/salad_buah.jpg",
                    "categori": "Makanan Sehat",
                    "description": "https://www.example.com/salad-buah-tutorial"
                  },
                  {
                    "id": 5,
                    "nama": "Pasta Carbonara",
                    "image": "https://example.com/images/pasta_carbonara.jpg",
                    "categori": "Makanan Italia",
                    "description": "https://www.example.com/pasta-carbonara-tutorial"
                  }
            ];
            res.status(200).json({data:data});

        } catch (err) {
            res.status(500).json({message: err.message || 'internal server error'})
        }
    },

   
}
