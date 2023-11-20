var express = require('express');
var router = express.Router();
const { index, actionStatus, actionDetail } = require('./controller');
const { isLoginAdmin } = require('../middleware/auth')

router.use(isLoginAdmin)
/* GET home page. */
router.get('/', index);
router.put('/status/:id', actionStatus);
router.get('/detail/:id', actionDetail);

module.exports = router;
