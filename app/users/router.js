var express = require('express');
var router = express.Router();
const { landingPage, detailPage, category, checkout, history, historyDetail, dashboard, profile, editProfile } = require('./controller');
const { isLoginUser } = require('../middleware/auth');
const os = require('os')
const multer = require('multer');
/* GET home page. */
router.get('/landingpage', landingPage);
router.get('/:id/detail/', detailPage);
router.get('/category', category);
router.post('/checkout', isLoginUser, checkout);
router.get('/history', isLoginUser, history);
router.get('/history/:id/detail', isLoginUser, historyDetail);
router.get('/dashboard', isLoginUser, dashboard);
router.get('/profile', isLoginUser, profile);
router.put('/profile',isLoginUser,
    multer({ dest: os.tmpdir() }).single('image'),
    editProfile);
module.exports = router;
