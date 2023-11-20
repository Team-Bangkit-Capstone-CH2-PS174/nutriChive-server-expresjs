const mongoose = require('mongoose');
let noteSchema = mongoose.Schema({

    title: {
        type: String,
        require: [true, 'Email harus diisi!']
    },
    content: {
        type: String,
        require: [true, 'Name harus diisi!']
    },
},
{timestamps : true})
module.exports = mongoose.model('Note', noteSchema)