//所有跟电影相关
var _underscore = require('underscore')
var movie = require('../models/movie')
var Comment = require('../models/comment')
var Category = require('../models/category')
var fs = require('fs')
var path = require('path')

//detail page
exports.detail = function (req, res) {
    var id = req.params.id
    movie.update ({_id: id},{$inc: {pv: 1}}, function(err){
        if(err){
            console.log(err)
        }
    })

    movie.findById(id, function (err, movie) {
        Comment
            .find({movie: id})
            .populate('from','name')
            .populate('reply.from reply.to','name')
            .exec(function(err, comments){
                res.render('detail', {
                    title: 'imooc'+ movie.title,
                    movie: movie,
                    comments: comments
                })
            })
    })
}

//admin update movie
exports.update = function(req, res){
    var id = req.params.id

    if(id){
        movie.findById(id, function(err, movie) {
            Category.find({}, function(err, categories) {
                res.render('admin', {
                    title: 'imooc 后台更新页',
                    movie: movie,
                    categories: categories
                })
            })
        })
    }
}

//admin poster
exports.savePoster = function(req, res, next){
  var posterData = req.files.uploadPoster
  var filePath = posterData.path
  var originalFilename = posterData.originalFilename  
  if (originalFilename) {
    fs.readFile(filePath, function(err, data) {
      var timestamp = Date.now()
      var type = posterData.type.split('/')[1]
      var poster = timestamp + '.' + type
      var newPath = path.join(__dirname, '../../', '/public/upload/' + poster)  
      fs.writeFile(newPath, data, function(err) {
        req.poster = poster
        next()
      })
    })
  }

    //设置上传方式为单文件上传 
    // var singleFileUpload=multer.single('uploadPoster')        
    //     singleFileUpload(req, res, function(err){
    //         if (err) {
    //        return  console.log(err);
    //         } 
    //         //由于设置了enctype='multipart/form-data'
    //         //我们在save方法里取req.body是取不到值的
    //         //这里使用multer的req.body能获取文本域的值
    //         //将multer里的req.body赋给当前的req.body
    //         //并next传给save方法 
    //         req.body = req.body
    //         console.log(req.file)
    //         next()
    //     })
}


//admin post movie
exports.post = function (req, res) {
    var movieObj = req.body.movie; 
    var id = movieObj._id;
    var _movie

    if (req.poster){
        movieObj.poster = req.poster
    }
    if (id) { // 已经存在的电影数据
        movie.findById(id, function (err, movie) {
            if (err) 
                console.log(err)


            _movie = _underscore.extend(movie, movieObj); 
            _movie.save(function (err, movie) {
                if (err) 
                    console.log(err)

                res.redirect('/movie/' + movie._id)
            })
        })
    } else {  // 新加的电影
        _movie = new movie(movieObj)
        var categoryId = movieObj.category
        var categoryName = movieObj.categoryName

        _movie.save(function (err, movie) {
            if (err) 
                console.log(err)

            if (categoryId){
                Category.findById(categoryId, function(err, category){
                    category.movies.push(movie._id)

                    category.save(function(err, category){
                        res.redirect('/movie/' + movie._id);
                    })
                })
            }
            else if(categoryName){
                var category = new Category({
                    name: categoryName,
                    movies: [movie._id]
                })

                category.save(function(err, category){
                    movie.category = category._id
                    movie.save(function(err,movie){
                        res.redirect('/movie/' + movie._id)  
                    })
                })
            }
        })
    }
}

//admin page
exports.save = function(req,res){
    Category.find({},function(err, categories){
        res.render('admin',{
            title:'imooc 后台录入页',
            categories: categories,
            movie:{}
        })
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
