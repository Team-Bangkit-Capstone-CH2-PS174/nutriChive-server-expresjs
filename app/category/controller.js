const Category = require('./model')
module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');

            const alert = { message: alertMessage, status: alertStatus}
            const category = await Category.find()
            res.render('admin/category/view_category', {
                category,
                alert,
                name: req.session.user.name,
                title: 'Halaman Kategori'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
            
            console.log(err);
        }
    },
    viewCreate: async (req, res) => {
        try {
            res.render('admin/category/create', {
                name: req.session.user.name,
                title: 'Halaman Tambah Kategori'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
            console.log(err);
        }
    },
    actionCreate: async (req, res) => {
        try {
            const { name } = req.body;
            let category = await Category({ name })
            await category.save();

            req.flash('alertMessage', "Berhasil Menambahkan Kategori")
            req.flash('alertStatus','success')
            res.redirect('/category');

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
            console.log(err);
        }
    },
    viewEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await Category.findOne({_id: id })
           
            res.render('admin/category/edit', {
                category, name: req.session.user.name,
                title: 'Halaman Edit Kategori' });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
            console.log(err);
        }
    },
    actionEdit: async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            await Category.findByIdAndUpdate({ _id: id }, {
                name
            });

            req.flash('alertMessage', "Berhasil Ubah Kategori")
            req.flash('alertStatus', 'success')
            res.redirect('/category');

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
            console.log(err);
        }
    },
    actionDelete: async (req, res) => {
        try {
            const { id } = req.params;
            await Category.findByIdAndRemove({ _id: id });
            req.flash('alertMessage', "Berhasil Hpus Kategori")
            req.flash('alertStatus', 'success')
            res.redirect('/category');
            
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
            console.log(err);
        }
    },
        actionDeletePilih: async (req, res) => {
        try {
           
            const { idPilih } = req.body;

            if (Array.isArray(idPilih)) {
                for (let x of idPilih) {
                    await Category.findByIdAndRemove({ _id: x });
                }
            } else {
                await Category.findByIdAndRemove({ _id: idPilih });
            }

            
           
            req.flash('alertMessage', "Berhasil Hapus Category")
            req.flash('alertStatus', 'success')
            res.redirect('/category');

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
            console.log(err);
        }
    },
}
