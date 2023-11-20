const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const HANS_ROUND = 10
let userSchema = mongoose.Schema({

    email: {
        type: String,
        require: [true, 'Email harus diisi!']
    },
    name: {
        type: String,
        require: [true, 'Name harus diisi!'],
        maxlength: [255, "panjang name harus antara 3-255 karakter"],
        minlength: [3, "panjang name harus antara 3-255 karakter"]
    },
    username: {
        type: String,
        require: [true, 'Name harus diisi!'],
        maxlength: [255, "panjang username harus antara 3-255 karakter"],
        minlength: [3, "panjang username harus antara 3-255 karakter"]
    },
    password: {
        type: String,
        require: [true, 'kata sandi harus diisi!'],
         maxlength: [255, "panjang password maksimal 255 karakter"],
        
    },
    phoneNumber: {
        type: String,
        require: [true, 'No telepon harus diisi!'],
        maxlength: [13, "panjang No telepon  antara 9-13 karakter"],
        minlength: [9, "panjang No telepon  antara 9-13 karakter"]
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    avatar: {
        type: String,
        
    },
    fileName: {
        type: String
    },
    favorite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',

    },

},
    { timestamps: true })
userSchema.path('email').validate(async function (value) {
    try {
        const count = await this.model('User').countDocuments({ email: value })
        return !count;
    } catch (err) {
        throw err
    }
}, attr => `${attr.value} sudah terdaptar`)
userSchema.pre('save', function (next){
    this.password = bcrypt.hashSync(this.password, HANS_ROUND)
    next()
})
    
module.exports = mongoose.model('User', userSchema)