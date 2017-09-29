var express = require('express') //加载express模块
var port = process.env.PORT || 3000
var path = require('path');
var morgan = require('morgan') 
var dbUrl = 'mongodb://localhost:27017/imooc'
var app = express()

app.locals.moment = require('moment'); // 载入moment模块，格式化日期
var connect = require('connect');
var cookieParser = require('cookie-parser')
var session = require('express-session')
var mongoose = require('mongoose')
var mongoStore = require('connect-mongo')(session)
 
app.use(cookieParser())
app.use(session({
    secret: 'imooc',
    store:new mongoStore({
        url: dbUrl,
        collection: "sessions"
    }),
    resave: false,
    saveUninitialized: true
}))

mongoose.Promise = global.Promise
mongoose.connect(dbUrl,{useMongoClient: true})

app.set('views', path.join(__dirname, 'app/views/pages')) //视图根目录
app.set('view engine','pug') 

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')))
app.listen(port)

if ('development' === app.get('env')){
    app.set('showStackError',true)
    app.use(morgan(':method :url :status'))
    app.locals.pretty = true
    mongoose.set('debug',true)
}

require('./config/routes')(app)

console.log('imooc service on port' + port)

