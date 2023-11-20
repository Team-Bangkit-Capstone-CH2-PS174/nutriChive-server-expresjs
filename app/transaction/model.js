const mongoose = require('mongoose');
let transactionSchema = mongoose.Schema({
    historyVoucherTopup: {
        gameName: { type: String, require: [true, 'nama harus di isi'] },
        category: { type: String, require: [true, 'kategori harus di isi'] },
        thumbnail: { type: String, require: [true, 'thumbnail harus di isi'] },
        coinName: { type: String, require: [true, 'coinName harus di isi'] },
        coinQuantity: { type: String, require: [true, 'jumlah coin harus di isi']},
        price: { type: Number },
    },
    historyPayment: {
        name: { type: String, require: [true, 'nama harus di isi'] },
        type: { type: String, require: [true, 'type harus di isi'] },
        bankName: { type: String, require: [true, 'nama Bank harus di isi'] },
        noRekening: { type: String, require: [true, 'No Rekening harus di isi'] },
    },
    name: {
        type: String,
        require: [true, 'Nama  harus diisi!'],
        maxlength: [255, "panjang name harus antara 3-255 karakter"],
        minlength: [3, "panjang name harus antara 3-255 karakter"]
    },
    accountUser: {
        type: String,
        require: [true, 'Nama user  harus diisi!'],
        maxlength: [255, "panjang name harus antara 3-255 karakter"],
        minlength: [3, "panjang name harus antara 3-255 karakter"]
    },
    numberTransaction:{
        type: String,
        default:0
    },

    tax: {
        type: Number,
        default:0
    },
    
    value: {
        type: Number,
        default:0
    },
   
    status: {
        type: String,
        enum: ['pending', 'success','failed'],
        default: 'pending'
    },

    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    },

    historyUser: {
        name: { type: String, require: [true, 'nama User harus di isi'] },
        phoneNumber: {
            type:Number,
            require: [true, 'nama User harus di isi'],
            maxlength: [13, "No hp harus antara 9-13 karakter"],
            minlength: [9, "no hp name harus antara 9-13 karakter"]
        }
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
       
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    },
},
    { timestamps: true })
module.exports = mongoose.model('Transaction', transactionSchema)