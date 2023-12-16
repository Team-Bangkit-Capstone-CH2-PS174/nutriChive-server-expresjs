var express = require('express');
var router = express.Router();
const { send } = require('./controller');
/* GET home page. */

router.post('/send', send);
module.exports = router;
