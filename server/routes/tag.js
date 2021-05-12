var express = require('express');
const checkLogin  = require('../middlewares/checklogin');
var router = express.Router();

// router.use(checkLogin); // 暂时不验证登录

const tag_controller = require('../controllers/tagController');

/* 获取post列表 */
/**
 * @route GET /tag/list
 * @group tag - Operations about user
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/tag/list', tag_controller.tag_list);

// post 请求添加新的tag
router.post('/tag/create', tag_controller.tag_create_post);

// GET request to delete Tag.
router.get('/tag/:id/delete', tag_controller.tag_delete_get);

// GET request to get Tag.
router.get('/tag/:id', tag_controller.tag_get_get);

// POST request to unpdate Tag.
router.post('/tag/:id/update', tag_controller.tag_update_post);

module.exports = router;