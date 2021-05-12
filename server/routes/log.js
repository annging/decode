var express = require('express');
var router = express.Router();

const log_controller = require('../controllers/logController');

// 登录
router.post('/in', log_controller.log_in_post);

//退出
router.get('/out', log_controller.log_out_get);

module.exports = router;