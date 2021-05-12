var express = require('express');
var router = express.Router();

const post_controller = require('../controllers/postController');
const tag_controller = require('../controllers/tagController');

/* 获取post列表 */
router.get('/post/list', post_controller.post_list);

// POST 请求添加新的post
router.post('/post/create', post_controller.post_create_post);

// GET 请求获取post
router.get('/post/:id', post_controller.post_get_get);

// GET request to delete Post.
router.get('/post/:id/delete', post_controller.post_delete_get);

// POST request to unpdate Post.
router.post('/post/:id/update', post_controller.post_update_post);

module.exports = router;