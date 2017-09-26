var express = require('express') //加载express模块
var port = process.env.PORT || 3000
var path = require('path');
var _underscore = require('underscore')
var movie = require('./models/movie')
var app = express()

app.locals.moment = require('moment'); // 载入moment模块，格式化日期

var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/imooc',{useMongoClient: true})

app.set('views', path.join(__dirname, 'views/pages')) //视图根目录
app.set('view engine','pug') 

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))
app.listen(port)

console.log('imooc service on port' + port)

//index page
app.get('/',function(req,res){
	movie.fetch(function(err,movies){
		if (err)
			console.log(err)
	
		res.render('index',{
			title:'imooc 首页',
			movies: movies
		})
	})
})

//detail page
app.get('/movie/:id', function (req, res) {
    var id = req.params.id;
    movie.findById(id, function (err, movie) {
        res.render('detail', {
            title: 'imooc'+ movie.title,
            movie: movie
        });
    });
});

//admin update movie
app.get('/admin/update/:id',function(req, res){
	var id = req.params.id

	if(id){
		movie.findById(id, function(err, movie){
			res.render('admin',{
				title: 'imooc 后台更新页'+ movie.title,
				movie: movie
			})
		})
	}
})

//admin post movie
app.post('/admin/movie/new', function (req, res) {
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
        });
    }
});

//admin page
app.get('/admin/movie',function(req,res){
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
})

//list page
app.get('/admin/list',function(req,res){
	movie.fetch(function(err,movies){
		if (err)
			console.log(err)

		res.render('list',{
			title:'imooc 列表页',
			movies: movies
		})
	})
})

//list delete movie
app.delete('/admin/list',function(req,res){
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
})