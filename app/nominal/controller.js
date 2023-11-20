const Nominal = require('./model')
module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');

            const alert = { message: alertMessage, status: alertStatus }
            const nominal = await Nominal.find()
            res.render('admin/nominal/view_nominal', {
                nominal,
                alert,
                name: req.session.user.name,
                title: 'Halaman Nominal'
                
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')

            console.log(err);
        }
    },
    viewCreate: async (req, res) => {
        try {
            res.render('admin/nominal/create', {
                name: req.session.user.name,
                title: 'Halaman Tambah Nominal'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
            console.log(err);
        }
    },
    actionCreate: async (req, res) => {
        try {
            const { coinName, coinQuantity,price } = req.body;
            let nominal = await Nominal({ coinName, coinQuantity, price })
            await nominal.save();

            req.flash('alertMessage', "Berhasil Menambahkan Nominal")
            req.flash('alertStatus', 'success')
            res.redirect('/nominal');

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
            console.log(err);
        }
    },
    viewEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const nominal = await Nominal.findOne({ _id: id })

            console.log('====================================');
            console.log(nominal);
            console.log('====================================');
            

            res.render('admin/nominal/edit', {
                nominal, name: req.session.user.name,
                title: 'Halaman Edit Nominal' });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
            console.log(err);
        }
    },
    actionEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const { coinName, coinQuantity, price } = req.body;
            await Nominal.findByIdAndUpdate({ _id: id }, { coinName, coinQuantity, price });

            req.flash('alertMessage', "Berhasil Ubah Nominal")
            req.flash('alertStatus', 'success')
            res.redirect('/nominal');

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
            console.log(err);
        }
    },
    actionDelete: async (req, res) => {
        try {
            const { id } = req.params;
            await Nominal.findByIdAndRemove({ _id: id });
            req.flash('alertMessage', "Berhasil Hapus Nominal")
            req.flash('alertStatus', 'success')
            res.redirect('/nominal');

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
            console.log(err);
        }
    }
}
