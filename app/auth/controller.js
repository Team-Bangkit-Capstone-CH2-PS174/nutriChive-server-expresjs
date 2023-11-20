const User = require('../users/model');
const path = require('path')
const fs = require('fs')
const config = require('../../config')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = {
    signup: async (req, res, next) => {
        try {
            const payload = req.body;
            if (req.file) {
                let temp_path = req.file.path;
                let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originaExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);

                const src = fs.createReadStream(temp_path);
                const dest = fs.createWriteStream(target_path);
                src.pipe(dest)
                src.on('end', async () => {
                    try {
                        const user = new User({
                            ...payload,
                            avatar: filename
                        });
                        await user.save();
                        delete user._doc.password
                        res.status(200).json({
                            data: user
                        })
                    } catch (err) {
                        if (err && err.name === 'ValidationError') {
                            return res.status(422).json({
                                error: 1,
                                message: err.message,
                                fields: err.errors
                            })
                        }
                        next(err)


                    }
                })
            } else {
                let user = new User(payload);
                await user.save()
                delete user._doc.password
                res.status(200).json({
                    data: user
                })
            }

        } catch (err) {
            if (err && err.name === 'ValidationError') {
                return res.status(422).json({
                    error: 1,
                    message: err.message,
                    fields: err.errors
                })
            }
            next(err)
        }
    },
    signupGoogle: async (req, res, next) => {
        try {
            const payload = req.body;
            if (req.file) {
                let temp_path = req.file.path;
                let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originaExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);

                const src = fs.createReadStream(temp_path);
                const dest = fs.createWriteStream(target_path);
                src.pipe(dest)
                src.on('end', async () => {
                    try {
                        const user = new User({
                            ...payload,
                            avatar: filename
                        });
                        await user.save();
                        delete user._doc.password
                        res.status(200).json({
                            data: user
                        })
                    } catch (err) {
                        if (err && err.name === 'ValidationError') {
                            return res.status(422).json({
                                error: 1,
                                message: err.message,
                                fields: err.errors
                            })
                        }
                        next(err)


                    }
                })
            } else {
                let user = new User(payload);
                await user.save()
                delete user._doc.password
                res.status(200).json({
                    data: user
                })
            }

        } catch (err) {
            if (err && err.name === 'ValidationError') {
                return res.status(422).json({
                    error: 1,
                    message: err.message,
                    fields: err.errors
                })
            }
            next(err)
        }
    },
    signin: async (req, res, next) => {
       
            const { email, password } = req.body;
            User.findOne({email : email}).then((user) => {
                if (user) {
                    const checkPassword = bcrypt.compareSync(password, user.password)
                    if (checkPassword) {
                        const token = jwt.sign({
                            user: {
                                id: user.id,
                                name:user.name,
                                username: user.username,
                                email: user.email,
                                phoneNumber: user.phoneNumber,
                                avatar: user.avatar
                            }
                        }, config.jwtKey)
                        res.status(200).json({
                            data:{token}
                        })  
                    } else {
                        res.status(403).json({
                            message: 'password yan anda masukan salah / akun belum terdaftar'
                        })  
                    }
                } else {
                    res.status(403).json({
                        message: 'email yan anda masukan belum terdaptar'
                    })
                }
                
            }).catch((err) => {
                res.status(500).json({
                    message: err.message || 'internal server erro'
                });
                next();
            })
                
    }
}