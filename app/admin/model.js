const mongoose = require('mongoose');
let adminSchema = mongoose.Schema({

    email: {
        type: String,
        require: [true, 'Email harus diisi!']
    },
    name: {
        type: String,
        require: [true, 'Name harus diisi!']
    },
    password: {
        type: String,
        require: [true, 'kata sandi harus diisi!']
    },
    phoneNumber: {
        type: String,
        require: [true, 'No telepon harus diisi!']
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'admin'
    },
   
},
{timestamps : true})
module.exports = mongoose.model('Admin', adminSchema)