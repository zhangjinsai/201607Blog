var express = require('express');
//引用bodyParser解析请求体，把请求体转成对象挂在req.body属性上
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var path = require('path');
var config = require('./config');
//首页路由
var index = require('./routes/index');
//用户路由
var user = require('./routes/user');
//文章路由
var article = require('./routes/article');
var app = express();
//public目录作为静态文件根目录
app.use(express.static(path.join(__dirname,'public')));
//使用urlencoded插件把序列化表单格式的请求体转成对象放在req.body上
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    secret:'zfpx',
    resave:true,
    saveUninitialized:true,
    //指定session数据的存放位置
    store:new MongoStore({
        url:config.dbUrl//数据库的地址
    })
}));
//设置模板引擎
app.set('view engine','html');
//设置模板的存放根目录
app.set('views',path.join(__dirname,'views'));
//设置模板的渲染函数
app.engine('html',require('ejs').__express);
app.use(function(req,res,next){
    res.locals.user = req.session.user;
    next();
});
//如果请求的路径以下面这个路径开头的话
app.use('/',index);
app.use('/user',user);
app.use('/article',article);
app.listen(9090);