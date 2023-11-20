const Bank = require('./model')

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');

            const alert = { message: alertMessage, status: alertStatus }
            const bank = await Bank.find();
            
            
            res.render('admin/bank/view_bank', {
                bank,
                alert,
                name: req.session.user.name,
                title: 'Halaman Bank'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')

            console.log(err);
        }
    },
    viewCreate: async (req, res) => {
        try {
          
            res.render('admin/bank/create', {
                name: req.session.user.name,
                title: 'Halaman Tambah Bank'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
            console.log(err);
        }
    },
    actionCreate: async (req, res) => {
        try {
            const { name, bankName, noRekening } = req.body;
            let bank = await Bank({ name, bankName, noRekening })
            await bank.save();

            req.flash('alertMessage', "Berhasil Menambahkan bank")
            req.flash('alertStatus', 'success')
            res.redirect('/bank');

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
            console.log(err);
        }
    },
    viewEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const bank = await Bank.findOne({ _id: id })


            res.render('admin/bank/edit', {
                bank, name: req.session.user.name,
                title: 'Halaman Ubah Edit' });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
            console.log(err);
        }
    },
    actionEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, bankName, noRekening } = req.body;
            await Bank.findByIdAndUpdate({ _id: id }, {
                name, bankName, noRekening
});

            req.flash('alertMessage', "Berhasil Ubah Bank")
            req.flash('alertStatus', 'success')
            res.redirect('/bank');

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
            console.log(err);
        }
    },
    actionDelete: async (req, res) => {
        try {
            const { id } = req.params;
            await Bank.findByIdAndRemove({ _id: id });
            req.flash('alertMessage', "Berhasil Hapus Bank")
            req.flash('alertStatus', 'success')
            res.redirect('/bank');

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
            console.log(err);
        }
    }
}


