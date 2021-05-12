const Tag = require('../models/tag');
const Post = require('../models/post');

let async = require('async');
const { body,validationResult } = require("express-validator");
let bodyParser = require('body-parser');

exports.tag_list = (req, res, next) => {
    Tag.find({})
    .exec(function (err, list_tags) {
      if (err) { return next(err); }
      //Successful, so render
      // res.render('index', { title: 'post List', post_list: list_posts });
      return res.send(Object.values(list_tags));
    });
};

// 由 POST 处理新建
exports.tag_create_post = async (req, res, next) => {
    const tag = new Tag(req.body);
    tag.save(function (err) {
        if (err) return next(err);
        // saved!
        let result = {
            code: 200,
            data: tag,
            message: "success"
        }
        res.set(
            {'Access-Control-Allow-Origin': '*'}
        );
        res.end(JSON.stringify(result));
    });
};

// 由 Get 获取 tag信息

// 由 POST 处理tag更新

// 由 get 处理删除
exports.tag_delete_get = function(req, res, next) {

    async.parallel({
        tag: function(callback) {
            Tag.findById(req.params.id).exec(callback)
        },
        tags_posts: function(callback) {
            Post.find({ 'tag': req.params.id }).exec(callback)
        },
    }, function(err, results) {
        let result = {
            code: 500,
            message: ''
        }
        if (err) { return next(err); }
        if (results.tag==null) { // No results.
            result.message = '未找到';
            console.log(result);
            res.end(JSON.stringify(result));
        } else if (results.tags_posts.length > 0) {
             // 不能删除
             result.message = '不能删除';
             res.end(JSON.stringify(result));
        } else {
            // Tag has no posts. Delete object .
            Tag.findByIdAndRemove(req.params.id, function deleteTag(err) {
                if (err) { return next(err); }
                // Success - 
                result.message = '删除成功';
                console.log(result);
                result.code = 200;
                res.end(JSON.stringify(result));
            });       
        }
    });

};

 exports.tag_get_get = function(req, res, next) {
    async.parallel({
        tag: function(callback) {
            Tag.findById(req.params.id)
              .exec(callback);
        },
        tag_posts: function(callback) {
          Post.find({ 'tag': req.params.id })
          .exec(callback);
        },

    }, function(err, results) {
        let result = {
            code: 500,
            data: null,
            message: ''
        };
        console.log(results);
        if (err) { return next(err); }
        if (results.tag==null) { // No results.
            result.message = 'tag没找到';
            result.code = 404;
            res.end(JSON.stringify(result));
        }
        result.code = 200;
        result.message="成功";
        result.data = results.tag;
        res.end(JSON.stringify(result));
    });

};

exports.tag_update_post = [
    // Validate and santitize fields.
    body('name', 'name must not be empty.').trim().isLength({ min: 1 }).escape(),

     // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

         // Create a Tag object with escaped/trimmed data and old id.
        var tag = new Tag({
            name: req.body.name,
            _id: req.params.id //This is required, or a new ID will be assigned!
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

        }
        else {
            // Data from form is valid. Update the record.
            Tag.findByIdAndUpdate(req.params.id, tag, {}, function (err) {
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