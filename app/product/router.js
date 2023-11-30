var express = require('express');
var router = express.Router();

const { listProduk,listProdukSearch } = require('./controller');
/* GET home page. */
router.get('/', listProduk);
router.get('/search', listProdukSearch);
module.exports = router;
