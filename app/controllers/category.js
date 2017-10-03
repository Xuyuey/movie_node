//负责和评论页进行交互
var mongoose = require('mongoose')
var Category = mongoose.model('Category')

//category page
exports.save = function(req,res){
    res.render('categoryAdmin',{
        title:'imooc 后台分类录入页',
        category: {}
    })
}

//admin post movie
exports.post = function (req, res) {
    var _category = req.body.category
    var category = new Category(_category)

    category.save(function (err, category) {
        if (err) 
            console.log(err);
        res.redirect('/admin/category/list');
    })
}

//list page
exports.list = function(req,res){
    Category.fetch(function(err,categories){
        if (err)
            console.log(err)

        res.render('categoryList',{
            title:'imooc 分类列表页',
            categories: categories
        })
    })
}
