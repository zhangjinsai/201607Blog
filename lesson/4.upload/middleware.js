var express = require('express');
var app = express();
var middle = function(req,res,next){
    console.log('I am here');
    next();
};
//app.use(middle);
app.get('/',function(req,res){
    res.send('hello');
});
app.get('/a',middle,function(req,res){
    res.send('hello');
});
app.get('/b',function(req,res){
    res.send('hello');
});
app.get('/c',function(req,res){
    res.send('hello');
});
app.listen(9090);