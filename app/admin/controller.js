const Admin = require('./model')
const bcrypt = require('bcryptjs')
module.exports = {
    viewSignin: async (req, res) => {
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');

            const alert = { message: alertMessage, status: alertStatus }
            if (req.session.user === null || req.session.user === undefined) {
                res.render('admin/users/view_signin', {
                    alert,

                })
            } else {
                res.redirect('/dashboard')
            }

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')

            console.log(err);
        }
    },
    actionSignin: async (req,res)=>{
        try {
           
            const { email, password } = req.body;
            const check = await Admin.findOne({ email: email });
            console.log(check);
           
            if (check) {
                if (check.status === 'Y') {
                    const checkPassword = await bcrypt.compare(password, check.password)
                    if (checkPassword) {
                        req.session.user = {
                            id: check._id,
                            email: check.email,
                            status: check.status,
                            name: check.name

                        }
                        res.redirect('/dashboard')
                    } else {
                        req.flash('alertMessage', `Kata sandi salah`)
                        req.flash('alertStatus', 'danger')
                        res.redirect('/')
                        console.log(err);
                    }
                    
                } else {
                    req.flash('alertMessage', `Mohon maaf status anda tidak akrif`)
                    req.flash('alertStatus', 'danger')
                    res.redirect('/')
                    console.log(err);
                }
                
            } else {
                req.flash('alertMessage', `Email yang anda masukan salah`)
                req.flash('alertStatus', 'danger')
                res.redirect('/')
                console.log(err);
            }
            
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
           
            console.log(err);
        }
    },
    actionLogout: (req, res) => {
        req.session.destroy();
        res.redirect('/')
    }
}
