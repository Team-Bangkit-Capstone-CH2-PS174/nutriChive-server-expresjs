var express = require('express');
var router = express.Router();
const { isLoginUser } = require('../middleware/auth');
const { listProduk,listProdukDetail,listProdukSearch,favorite,unfavorite,listfavorite,listFavSearch } = require('./controller');
/* GET home page. */
router.get('/',listProduk);
router.get('/detail/:id', listProdukDetail);
router.get('/search', listProdukSearch);
router.get('/listfavorite',isLoginUser, listfavorite);
router.get('/searchFav',isLoginUser, listFavSearch);
router.post('/favorite', isLoginUser, favorite);
router.post('/unfavorite', isLoginUser, unfavorite);

module.exports = router;
