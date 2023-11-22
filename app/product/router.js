var express = require('express');
var router = express.Router();

const { listProduk } = require('./controller');
/* GET home page. */
router.get('/', listProduk);
module.exports = router;
