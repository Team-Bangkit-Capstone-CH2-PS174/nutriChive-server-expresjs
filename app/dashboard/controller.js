
const Transaction = require('../transaction/model')
const Voucher = require('../voucher/model')
const User = require('../users/model')
const Category = require('../category/model')
module.exports = {
    index: async (req, res) => {
        try {
            const transaction = await Transaction.countDocuments()
            const voucher = await Voucher.countDocuments()
            const user = await User.countDocuments()
            const category = await Category.countDocuments()
            res.render('admin/dashboard/view_dashboard', {
                name: req.session.user.name,
                title: 'Halaman Dashboard',
                count: {
                    transaction,
                    voucher,
                    user,
                    category
                }
            })
           
        } catch (err) {
            console.log(err);
        }
    }
}