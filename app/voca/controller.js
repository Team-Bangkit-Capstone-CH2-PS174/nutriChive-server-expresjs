const voca = require('./function')
const midtransClient = require('midtrans-client');

module.exports = {
    
    generateProduct: async (req, res) => {
        try {
            let endpoint = "/products"
           let  signature = voca.generate_signature(endpoint)
           url =  voca.host + endpoint +"?signature="+ signature
           
           const result  = await voca.voca_curl(url,false,null).then(response =>{

            res.status(200).json({
                data :response.data
               })
           })

        } catch (err) {
            res.status(500).json({
                data :err
               })
        }
    },
}
