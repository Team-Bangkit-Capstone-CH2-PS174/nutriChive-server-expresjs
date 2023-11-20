const midtransClient = require('midtrans-client');
const Transaction = require('../transaction/model')
module.exports = {
    

    payment: async (req, res) => {
        const snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: 'SB-Mid-server-hfh22uDGNAqew6_-9GHeKPVb',
            clientKey: 'SB-Mid-client-B9ltW6v0W3ecbD2P'
          });
          const { order_id, gross_amount } = req.body;

            const parameter = {
                transaction_details: {
                order_id,
                gross_amount
                },
                credit_card: {
                secure: true
                }
            };
            try {
                const transaction = await snap.createTransaction(parameter);

                res.send({ data: transaction.token });
              } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Failed to create transaction' });
              }
    },
    callbackPayement: async (req, res) => {
       
        const { body } = req;
     const { transaction_status, order_id, fraud_status } = body;

        // Lakukan log transaksi
        console.log(`Transaksi dengan ID ${order_id} memiliki status ${transaction_status} dan fraud status ${fraud_status}`);
           
            // Proses sesuai status transaksi
            if (transaction_status == 'capture') {
                // Transaksi berhasil dilakukan
                // Kirim notifikasi ke pelanggan
                // Update status pesanan di database
                res.status(200).json({
                    'data': 'success'
                })
            } else if (transaction_status == 'settlement') {
                const filter = { numberTransaction: order_id };
                const update = { $set: { status: transaction_status } };
                try {
                    const t = await Transaction.findOneAndUpdate(filter, update, { new: true });
                  
                    if (t) {
                        res.status(200).json({
                            'data': 'success'
                        })
                    } else {
                        res.status(500).json({
                            'data': 'error'
                        })
                    }
                  } catch (err) {
                    res.status(500).json({
                        'data': err.message
                    })
                  }
            } else if (transaction_status == 'deny') {
                res.status(200).json({
                    'data': 'tolak'
                })
                // Transaksi ditolak
                // Kirim notifikasi ke pelanggan
                // Update status pesanan di database
            } else if (transaction_status == 'cancel') {
                res.status(200).json({
                    'data': 'cancel'
                })
                // Transaksi dibatalkan
                // Kirim notifikasi ke pelanggan
                // Update status pesanan di database
            } else if (transaction_status == 'expire') {
                // Transaksi sudah kadaluarsa
                // Kirim notifikasi ke pelanggan
                // Update status pesanan di database
            } else if (transaction_status == 'pending') {
                // Transaksi masih dalam proses
                // Kirim notifikasi ke pelanggan
                // Tidak perlu melakukan perubahan di database karena status masih pending
            } else {
                // Transaksi lainnya (contoh: challenge, refund, dll.)
                // Tidak perlu melakukan perubahan di database karena tidak relevan dengan status pembayaran
            }

            // Kirim response ke Midtrans agar tidak mengirim ulang callback
                    res.sendStatus(200).json({
                    'code' :200,
                    'message' : 'Midtrans notification success'
                    });
                },
     finish:  async (req, res) => {
        res.redirect('http://localhost:3000/complete-checkout');
    },
    
      cobabayar:  async (req, res) => {
        try {
           

           
            res.render('admin/payment/midtrans', {
                title: 'Halaman Jenis Pembayaran'
                
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')

            console.log(err);
        }
    }
}
