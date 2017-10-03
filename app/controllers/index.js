//负责和首页进行交互
var mongoose = require('mongoose')
var movie = require('../models/movie')
var Category = require('../models/category')

//index page
exports.index = function(req,res){
    Category
    	.find({})
    	.populate({
    		path:'movies', 
    		options: {
    			limit: 5
    		}
    	})
    	.exec(function(err,categories){
	        if (err)
	            console.log(err)
	    	console.log(categories)
	        res.render('index',{
	            title:'imooc 首页',
	            categories: categories
	        })
    	})
}

//index page
exports.search = function(req,res){
	var catId = req.query.cat
	var page = parseInt(req.query.p,10) || 0
	var q = req.query.q
	var count = 2
	var index = page*count

	if(catId){
	    Category
	    	.find({_id: catId})
	    	.populate({
	    		path:'movies', 
	    		select: 'title poster',
	    		//这个选项现在mongoose还不支持
	    		/*options: {
	    			limit: 2,
	    			skip: index
	    		}*/
	    	})

	    	.exec(function(err,categories){
		        if (err)
		            console.log(err)
		    	//通过category.find和.populate拿到当前分类下的所有电影数据之后
		    	//有拿到了分类
		    	//就可以去取它的Movies
		    	var category = categories[0] || {}
		    	var movies = category.movies || []
		    	//从数组里面将我们需要的取出来，声明为results
		    	//调用slice方法，第一个参数是我们要从哪一个参数开始取
		    	//截止到那一条数据
		    	var results = movies.slice(index, index + count)

		        res.render('results',{
		            title:'imooc 结果列表',
		            keyword: category.name,
		            //当前是第几页一共有多少页
		            currentPage: (page +1),
		            query : 'cat='+catId,
		            totalPage: Math.ceil(movies.length/count),//向上取整
		            movies: results
		        })
	    	})
	}
	else{
		movie
	    	.find({title: new RegExp(q+ '.*','i')})
	    	.exec(function(err,movies){
		        if (err)
		            console.log(err)

		    	var results = movies.slice(index, index + count)

		        res.render('results',{
		            title:'imooc 结果列表',
		            keyword: q,
		            //当前是第几页一共有多少页
		            currentPage: (page +1),
		            query : 'q='+q,
		            totalPage: Math.ceil(movies.length/count),//向上取整
		            movies: results
		        })
	    	})
	}
}
