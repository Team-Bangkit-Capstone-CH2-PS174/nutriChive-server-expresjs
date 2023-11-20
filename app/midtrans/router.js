var express = require('express');
var router = express.Router();
const { generateProduct,payment ,cobabayar,callbackPayement,finish} = require('./controller');
// /* GET home page. */
// const { isLoginAdmin } = require('../middleware/auth')

// router.use(isLoginAdmin)
router.get('/finish', finish);
router.post('/payment', payment);
router.post('/callbackPayement', callbackPayement);

module.exports = router;
