const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: {type: String, required: true}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// 虚拟属性'url'
TagSchema
  .virtual('url')
  .get(function () {
    return '/category/' + this.name + '/' + this._id;
  });

// 导出 Tag 模块
module.exports = mongoose.model('Tag', TagSchema);