
const bcrypt = require('bcryptjs')
module.exports = {
    listProduk: async (req, res) => {
        try {
            const data = [
                {
                    
                    "nama": "Nasi Goreng",
                    "image": "https://example.com/images/nasi_goreng.jpg",
                    "categori": "Makanan Utama",
                    "description": "https://www.example.com/nasi-goreng-tutorial",
                    "ingredients":[
                      {
                        "image":"url image Onion",
                         "name": "Onion"
                      },
                      {

                        "image":"Salt image Onion",
                         "name": "Salt"
                      },
                    ],
                    "step":[
                      "1.Langkah 1",
                      "2.Langkah 2",
                      "3.Langkah 3",
                    ]
                  },
                  
            ];
            res.status(200).json({data:data});

        } catch (err) {
            res.status(500).json({message: err.message || 'internal server error'})
        }
    },

   
}
