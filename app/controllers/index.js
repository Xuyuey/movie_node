//负责和首页进行交互
var movie = require('../models/movie')

//index page
exports.index = function(req,res){
    console.log(req.session.user)
    
    movie.fetch(function(err,movies){
        if (err)
            console.log(err)
    
        res.render('index',{
            title:'imooc 首页',
            movies: movies
        })
    })
}
