var express = require('express');
var router = express.Router();
const { signup, signin,signupGoogle } = require('./controller');
/* GET home page. */
const multer = require('multer');
const os = require('os')
router.post('/signup', multer({ dest: os.tmpdir() }).single('image'), signup);
router.post('/signupGoogle', multer({ dest: os.tmpdir() }).single('image'), signupGoogle);
router.post('/signin', signin);
module.exports = router;
