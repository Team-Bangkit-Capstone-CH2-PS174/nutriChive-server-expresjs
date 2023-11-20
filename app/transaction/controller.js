const Transaction = require('./model')
const dotenv = require('dotenv');

dotenv.config()
module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');

            const alert = { message: alertMessage, status: alertStatus }
            const transaction = await Transaction.find().populate('user');
           
           
            res.render('admin/transaction/view_transaction', {
                transaction,
                alert,
                name: req.session.user.name,
                title: 'Halaman Jenis Pembayaran'
                
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/transaction')

            console.log(err);
        }
    },
    actionStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.query;
          
           await Transaction.findByIdAndUpdate({ _id: id }, { status });
          
            req.flash('alertMessage', "Berhasil Ubah Status")
            req.flash('alertStatus', 'success')
            res.redirect('/transaction');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/transaction')

            console.log(err);
        }
    },

    actionDetail: async (req, res)=>{
        console.log('dani',process.env.URL)
        try {
            const { id } = req.params;
            const { status } = req.query;
            const transaction = await Transaction.findByIdAndUpdate({ _id: id }, { status });
         
          
            res.render('admin/transaction/view_transaction_detail', {
                transaction,
                url: process.env.URL,
                name: req.session.user.name,
                title: 'Halaman Jenis Pembayaran'

            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/transaction')
            console.log(err);
        }
    },
   
   
}
