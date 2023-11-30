var express = require('express');
var router = express.Router();

const { listProduk,listProdukDetail,listProdukSearch } = require('./controller');
/* GET home page. */
router.get('/', listProduk);
router.get('/detail/:id', listProdukDetail);
router.get('/search', listProdukSearch);
module.exports = router;
