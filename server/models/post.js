const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {type: String, required: true},
  body: {type: String, required: true},
  url: {type: String, required: true},
  domain: {type: String},
  tag: [{type: Schema.Types.ObjectId, ref: 'Tag'}]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// 导出 Post 模块
module.exports = mongoose.model('Post', PostSchema);