var express = require('express') //加载express模块
var port = process.env.PORT || 3000
var path = require('path');
var mongoose = require('mongoose')
var _ = require('underscore')
var Movie = require('./models/movie')
var app = express()

mongoose.connect('mongodb://localhost/imooc',{useMongoClient: true})

app.set('views', path.join(__dirname, 'views/pages')) //视图根目录
app.set('view engine','pug') 

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port)

console.log('imooc service on port' + port)

//index page
app.get('/',function(req,res){
	Movie.fetch(function(err,movies){
		if (err)
			console.log(err)
	
		res.render('index',{
			title:'imooc 首页',
			movies: movies
		})
	})
})

//detail page
app.get('/movie/:id',function(req,res){
	var id = req.params.id

	Movie.findById(id, function(err, movie){
		if (err)
			console.log(err)
		res.render('detail',{
			title:'imooc '+ movie.title,
			movie: movie
	    })
	})
})
//admin update movie
app.get('/admin/movie/:id',function(res, req){
	var id = req.params.id

	if(id){
		Movie.findById(id, function(err, movie){
			res.render('admin',{
				title: 'imooc 后台更新页',
				movie: movie
			})
		})
	}
})

//admin post movie
app.post('/admin/movie/new', function(res, req){
	var id = req.body.movie._id
	var movieObj = req.body.movie
	var _movie =null

	if(id != 'undefined'){
		Movie.findById(id ,function(err, movie){
			if (err)
				console.log(err)
			_movie = _.extend(movie, movieObj)
			_movie.save(function(err, movie){
				if (err)
					console.log(err)
				res.redirect('/movie/'+movie._id)
			})
		})
	}
	else{
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			language: movieObj.language,
			country: movieObj.country,
			summary: movieObj.summary,
			flash: movieObj.flash,
			poster: movieObj.poster,
			year: movieObj.year
		})

		_movie.save(function(err, movie){
			if (err)
				console.log(err)
			res.redirect('/movie/'+movie._id)
		})
	}
})

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
	Movie.fetch(function(err,movies){
		if (err)
			console.log(err)

		res.render('list',{
			title:'imooc 列表页',
			movies: movies
		})
	})
})





// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');

// var index = require('./routes/index');
// var users = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/users', users);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
