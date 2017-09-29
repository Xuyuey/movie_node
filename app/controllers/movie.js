//所有跟电影相关
var _underscore = require('underscore')
var movie = require('../models/movie')

//detail page
exports.detail = function (req, res) {
    var id = req.params.id
    movie.findById(id, function (err, movie) {
        res.render('detail', {
            title: 'imooc'+ movie.title,
            movie: movie
        })
    })
}

//admin update movie
exports.update = function(req, res){
    var id = req.params.id

    if(id){
        movie.findById(id, function(err, movie){
            res.render('admin',{
                title: 'imooc 后台更新页'+ movie.title,
                movie: movie
            })
        })
    }
}

//admin post movie
exports.post = function (req, res) {
    var id = req.body.movie._Id;
    var movieObj = req.body.movie;
    var _movie = null;
    console.log(typeof(id))
    if (typeof(id)!== 'undefined') { // 已经存在的电影数据
        movie.findById(id, function (err, movie) {
            if (err) 
                console.log(err);
            _movie = _underscore.extend(movie, movieObj); 
            _movie.save(function (err, movie) {
                if (err) 
                    console.log(err);
                res.redirect('/movie/' + movie._id);
            });
        });
    } else {  // 新加的电影
        _movie = new movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        });
        _movie.save(function (err, movie) {
            if (err) 
                console.log(err);
            res.redirect('/movie/' + movie._id);
        })
    }
}

//admin page
exports.save = function(req,res){
    res.render('admin',{
        title:'imooc 后台录入页',
        movie:{
            title: '',
            doctor: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }
    })
}

//list page
exports.list = function(req,res){
    movie.fetch(function(err,movies){
        if (err)
            console.log(err)

        res.render('list',{
            title:'imooc 列表页',
            movies: movies
        })
    })
}

//list delete movie
exports.delete = function(req,res){
    var id = req.query.id

    if(id){
        movie.remove({_id:id},function(err,movie){
            if(err)
                console.log(err)
            else{
                res.json({success:1})
            }
        })
    }
}
