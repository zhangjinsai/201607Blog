var express = require('express');
var path = require('path');
var app = express();
//设置模板引擎
app.set('view engine','html');
//设置模板的存放根目录
app.set('views',path.join(__dirname,'views'));
//设置模板的渲染函数
app.engine('html',require('ejs').__express);
app.use(function(req,res,next){
    res.locals.title = '首页';
    next();
});
/**
 * 为了能在模板使用一个变量，
 * 真正渲染模板的数据对象是 res.locals
 */
app.get('/1',function(req,res){
    res.render('index',{title:'首页1111'});
});
app.get('/2',function(req,res){
    res.render('index',{});
});
app.listen(9090);