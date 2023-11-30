const User = require('./model')
const Voucher = require('../voucher/model')
const Payment = require('../payment/model')
const Category = require('../category/model')
const Nominal = require('../nominal/model')
const Bank = require('../bank/model')
const Transaction = require('../transaction/model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')
const { populate } = require('./model')
module.exports = {
    landingPage: async (req, res) => {
    try {
        const voucher = await Voucher.find().select('_id name status category thumbnail').populate('category')
        
        res.status(200).json({ data: voucher });
    } catch (err) {
        res.status(500).json({message: err.message || 'internal server error'})
    }
    },
    detailPage: async (req, res) => {
        console.log('req', req.params.id);
        try {
            const { id } = req.params

            const voucher = await Voucher.findOne({ _id: id }).populate('nominals').populate('category')
                .populate('user', '_id name phoneNumber').populate({
                    path: 'payment',
                    populate: {
                        path: 'banks',
                        model: 'Bank'
                    }
                }).exec()
            if (!voucher) {
                return res.status(404).json({
                    message : 'Voucher game tidak ditemukan!'
                })
            }
            res.status(200).json({
                data:{ detail: voucher}
            });
        } catch (err) {
            res.status(500).json({ message: err.message || 'internal server error' })
        }
    },
    category: async (req, res) => {
        try {
            const category = await Category.find();
            res.status(200).json({ data: category }); 
        } catch (err) {
            res.status(500).json({ message: err.message || 'internal server error' })
        }
    
    },
    checkout: async (req, res) => {
        console.log('body',req.body);
        try {
            const { accountUser, name, nominal, voucher, payment, bank,numberTransaction } = req.body;

            const res_voucher = await Voucher.findOne({ _id: voucher }).select('name category _id thumbnail user').populate('category').populate('user')
            
            if (!res_voucher) return res.status(404).json({ message: 'voucher Game tidak ada ' })

            const res_nominal = await Nominal.findOne({ _id: nominal })

            if (!res_nominal) return res.status(404).json({ message: 'Nominal  Game tidak ada' })

            const res_payment = await Payment.findOne({ _id: payment })
            if (!res_payment) return res.status(404).json({ message: 'Payment   tidak ada' })

            const res_bank = await Bank.findOne({ _id: bank  })
            if (!res_bank) return res.status(404).json({ message: '  Bank tidak adak' })
            let tax = (10 / 100) * res_nominal._doc.price;
            let value =  res_nominal._doc.price + tax;
            
            const payload = {
                historyVoucherTopup: {
                    gameName: res_voucher._doc.name,
                    category: res_voucher._doc.category ? res_voucher._doc.category.name: '',
                    thumbnail: res_voucher._doc.thumbnail,
                    coinName: res_nominal._doc.coinName,
                    coinQuantity: res_nominal._doc.coinQuantity,
                    price: res_nominal._doc.price,
                },
                historyPayment: {
                    name: res_bank._doc.name, 
                    type: res_payment._doc.type,
                    bankName: res_bank._doc.bankName,
                    noRekening: res_bank._doc.bankName,
                },
                name : name,
                accountUser: accountUser,
                numberTransaction: numberTransaction,
                tax: tax,
                value: value,
                user: req.user._id,
                historyUser: {
                    name: res_voucher._doc.user ? res_voucher._doc.user.name : undefined,
                    phoneNumber: res_voucher._doc.user ? res_voucher._doc.user.phoneNumber : undefined,
                  },
                category: res_voucher._doc.category && res_voucher._doc.category._id,
                admin: res_voucher._doc.user && res_voucher._doc.user._id,
                  
            }
            console.log('====================================');
            console.log('payload',payload);
            console.log('====================================');
            const transaction = new Transaction(payload)
            await transaction.save();

            res.status(201).json({
                data: transaction
            })
        } catch (err) {
            res.status(500).json({ message: err.message || 'internal server error' })
        }
    },
    history: async (req, res) => {
       
        try {
            const { status = '' } = req.query;
            let criteria = {}
            if (status.length) {
                criteria = {
                    ...criteria,
                   status : {$regex : `${status}`, $options:'i'}
                }
            }
            if (req.user._id) {
                criteria = {
                    ...criteria,
                    user :req.user._id
                }
            }
            const history = await Transaction.find(criteria).populate('category')
            let total = await Transaction.aggregate([
                { $match: criteria },
                {
                    $group: {
                        _id: null,
                        value: {$sum : "$value"}
                }}
            ])
            res.status(200).json({
                data: history,
                total: total.length ? total[0].value : 0
            })
        } catch (err) {
            res.status(500).json({ message: err.message || 'internal server error' })
        }
    },
    historyDetail: async (req, res) => {
       
            try {
                const { id } = req.params;
                const history = await Transaction.findOne({_id: id});
                if (!history) return res.status(404).json({message:"History tidak di temukan"})
                res.status(200).json({ data: history });
                
            } catch (err) {
                res.status(500).json({ message: err.message || 'internal server error' })
            }
    },
    dashboard: async (req, res) => {
        try {
            const count = await Transaction.aggregate([
                { $match: { user: req.user._id } },
                {
                    $group: {
                        _id: '$category',
                        value:{$sum : '$value'}
                    }
                }
            ])
            const category = await Category.find({});

            category.forEach(element => {
                count.forEach(data => {
                    if (data._id.toString() === element._id.toString()) {
                        data.name = element.name
                    }
                })
            });
            const history = await Transaction.find({user:req.user._id})
                .populate('category')
                .sort({ 'updateAt': -1 })
            
            res.status(200).json({
                data: history,count
            })
            

        } catch (err) {
            res.status(500).json({ message: err.message || 'internal server error' })
        }
    },
    profile: async (req, res) => {
        try {
            const user = {
                id: req.user._id,
                username: req.user.username,
                email: req.user.email,
                name: req.user.name,
                avatar: req.user.avatar,
                phoneNumber: req.user.phoneNumber,
            }
            res.status(200).json({ data: user });

        } catch (err) {
            res.status(500).json({ message: err.message || 'internal server error' })
        }
    },
    editProfile: async (req, res, next) => {
        
        try {
            
        const { name = "", phoneNumber = "" } = req.body;
        const payload = {};
        if (name.length) payload.name = name;
        if (phoneNumber.length) payload.phoneNumber = phoneNumber;
        if (req.file) {
            let temp_path = req.file.path;
            let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originaExt;
            let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);

            const src = fs.createReadStream(temp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest)
            src.on('end', async () => {
               
                    let user = await User.findOne({ _id: req.user._id });

                    let currentImage = `${config.rootPath}/public/uploads/${user.avatar}`;

                    if (fs.existsSync(currentImage)) {
                        fs.unlinkSync(currentImage)
                    }

                   user =  await User.findOneAndUpdate({
                       _id: req.user._id
                    }, {
                        ...payload,
                        avatar: filename
                   }, { new: true, runValidators: true }) 
                res.status(201).json({
                    data: {
                        id: user.id,
                        name: user.name,
                        phoneNumber: user.phoneNumber,
                        avatar: user.avatar
                    }
                })
              
            })
            src.on('err', async () => {
                next(err)
            })
        } else {
            const user = await User.findByIdAndUpdate({
                _id: req.user._id
            }, payload, { new: true, runValidators: true })
            res.status(200).json({
                data: {
                    id: user.id,
                    name: user.name,
                    phoneNumber: user.phoneNumber,
                    avatar: user.avatar
                }
            })
        }

        } catch (err) {
            if (err && err.name === "ValidationError") {
                res.status(422).json({
                    error: 1,
                    message: err.message,
                    fields: err.errors
                })
            }
        }

    }
}