var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var CategorySchema = new mongoose.Schema({
    name: String,
    //这个分类下电影的ID
    //拿到这个分类，就可以取到所有的电影ID
    movies: [{type: ObjectId, ref: 'movie'}], 
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

// movieSchema.pre 表示每次存储数据之前都先调用这个方法
CategorySchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

// movieSchema 模式的静态方法
CategorySchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}

// 导出movieSchema模式
module.exports = CategorySchema;

