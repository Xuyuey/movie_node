var express = require('express') //加载express模块
var port = process.env.PORT || 3000
var path = require('path');
var app = express()

app.set('views', path.join(__dirname, 'views/pages')) //视图根目录
app.set('view engine','pug') 

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port)

console.log('imooc service on port' + port)

//index page
app.get('/',function(req,res){
	res.render('index',{
		title:'imooc 首页',
		movies: [{
			title: '机械',
			_id: 1,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		},{
			title: '机械',
			_id: 2,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		},{
			title: '机械',
			_id: 3,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		},{
			title: '机械',
			_id: 4,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		},{
			title: '机械',
			_id: 5,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		},{
			title: '机械',
			_id: 6,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		}]
	})
})

//detail page
app.get('/movie/:id',function(req,res){
	res.render('detail',{
		title:'imooc 详情页',
		movie: {
			doctor: 'xuyeu',
			country: 'spanish',
			title: 'jixie',
			year: '2003',
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language: 'spanish',
			flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary: '不开玩笑哒~~~介绍这篇和接下来几篇Node文章的内容，基本都属于Node的初阶，略偏实战，进阶和高阶内容正在YY中，最终的目录与里程碑下一篇应该差不多能定下来。　　本篇以介绍Express为话题，延伸出用Node开发小页面，然后其中穿插概述express主要的API、路由的原理、Node模块概念，顺便也会介绍自己使用Node工具等等。默认看官们都具备JavaScript基础，所以过于基础的内容俺就不浪费篇幅咯，GOGO。'
		}
	})
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
	res.render('list',{
		title:'imooc 列表页',
		movies: [{
			title: 'jixie',
			_id: 1,
			doctor: 'xuyeu',
			country: 'spanish',
			year: '2003',
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language: 'spanish',
			flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary: '不开玩笑哒~~~介绍这篇和接下来几篇Node文章的内容，基本都属于Node的初阶，略偏实战，进阶和高阶内容正在YY中，最终的目录与里程碑下一篇应该差不多能定下来。　　本篇以介绍Express为话题，延伸出用Node开发小页面，然后其中穿插概述express主要的API、路由的原理、Node模块概念，顺便也会介绍自己使用Node工具等等。默认看官们都具备JavaScript基础，所以过于基础的内容俺就不浪费篇幅咯，GOGO。'
		}]
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
