var express = require('express');
var router = express.Router();
const { isLoginUser } = require('../middleware/auth');
const { listProduk,listProdukDetail,listProdukSearch,favorite,unfavorite,listfavorite } = require('./controller');
/* GET home page. */
router.get('/',listProduk);
router.get('/detail/:id', listProdukDetail);
router.get('/search', listProdukSearch);
router.get('/listfavorite', listfavorite);
router.post('/favorite', isLoginUser, favorite);
router.post('/unfavorite', isLoginUser, unfavorite);

module.exports = router;
