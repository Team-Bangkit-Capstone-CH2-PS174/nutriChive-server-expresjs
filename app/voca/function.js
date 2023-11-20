const axios = require ('axios')
const crypto = require ('crypto')
 const host ="https://api-bisnis.vocagame.com/v1/core"
 const merchantID ="77983775-83ec-4223-b3c0-13fbf30a0182"
 const secretKey ="9fb87f651b69a5ec363b34ee9ce513961a1d177988d96c979654bf3e0541cf8e"
 const callbackKey="VOCA_47b911ce8054131c1661256525178" 


 async function voca_curl(url,post=false,datas = null){

    let config ={
        method :(post) ? 'post':'get',
        url :url,
        headers:{
            'X-Merchant' : merchantID,
            'Content-type': "application/json",
        },
        data:  (post) ? datas: null, 
    }
    let response = await axios(config);
    return response.data;
 }

 function generate_signature(endpoint){
    let string = merchantID + endpoint;
    const signature = crypto.createHmac('sha256',secretKey).
    update(merchantID + endpoint).digest('hex');
    return signature;
 }
 module.exports ={host,merchantID,secretKey,callbackKey,voca_curl,generate_signature}