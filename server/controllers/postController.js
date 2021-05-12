const Post = require('../models/post');
const Tag = require('../models/tag');

let async = require('async');
const { body,validationResult } = require("express-validator");
let bodyParser = require('body-parser');

exports.post_list = (req, res, next) => {
    Post.find({})
    .populate('tag')
    .exec(function (err, list_posts) {
      if (err) { return next(err); }
      //Successful, so render
      // res.render('index', { title: 'post List', post_list: list_posts });
      let result = {
          code: 200,
          data: Object.values(list_posts),
          message: 'success'
      }
      return res.send(JSON.stringify(result));
    });
};

// 由 POST 处理新建
exports.post_create_post = async (req, res, next) => {
    const post = new Post(req.body);
    post.save(function (err) {
        if (err) return next(err);
        // saved!
        let result = {
            code: 200,
            data: post,
            message: "success"
        }
        res.end(JSON.stringify(result));
    });
};

// 由 GET 处理 详情
exports.post_get_get = (req, res, next) => {
    async.parallel({
        post: function(callback) {
            Post.findById(req.params.id)
              .populate('tag')
              .exec(callback);
        }
    }, function(err, results) {
        let result = {
            code: 500,
            data: null,
            message: '' 
        }
        if (err) { return next(err); }
        if (results.post==null) { // No results.
            var err = new Error('Post not found');
            err.status = 404;
            return next(err);
        }
        result.code = 200;
        result.message="success";
        result.data = results.post;
        res.end(JSON.stringify(result));
    });
}

// 由 get 处理删除
exports.post_delete_get = function(req, res, next) {

    async.parallel({
        post: function(callback) {
            Post.findById(req.params.id).exec(callback)
        }
    }, function(err, results) {
        let result = {
            code: 500,
            message: ''
        }
        if (err) { return next(err); }
        if (results.post==null) { // No results.
            result.message = '未找到';
            console.log(result);
            res.end(JSON.stringify(result));
        } else {
            // Tag has no posts. Delete object .
            Post.findByIdAndRemove(req.params.id, function deletePost(err) {
                if (err) { return next(err); }
                // Success - 
                result.message = '删除成功';
                console.log(result);
                result.code = 200;
                res.end(JSON.stringify(result));
            });       
        }
    });

}

exports.post_update_post = [
    // Convert the tag to an array
    (req, res, next) => {
        if(!(req.body.tag instanceof Array)){
            if(typeof req.body.tag==='undefined')
            req.body.tag=[];
            else
            req.body.tag=new Array(req.body.tag);
        }
        next();
    },

    // Validate and santitize fields.
    body('title', 'title must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('body', 'body must not be empty.').trim().isLength({ min: 1 }).escape(),
    body('url', 'url must not be empty.').trim().isLength({ min: 1 }).escape(),

     // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

         // Create a Tag object with escaped/trimmed data and old id.
        var post = new Post({
            title: req.body.title,
            body: req.body.body,
            url: req.body.url,
            domain: req.body.domain,
            tag: req.body.tag,
            _id: req.params.id //This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

        }
        else {
            // Data from form is valid. Update the record.
            Post.findByIdAndUpdate(req.params.id, post, {}, function (err) {
                console.log(err);
                if (err) { return next(err); }
                   // Successful - .
                   let result = {
                       code: 200,
                       message: '更新成功'
                   };
                   res.end(JSON.stringify(result));
                   
                });
        }
    }


]


 