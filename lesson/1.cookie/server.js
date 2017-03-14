/**
 * 统计这个客户端访问本服务器的次数
 */
var express = require('express');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var app = express();
//访问本服务器
/*app.get('/visit',function(req,res){
 //获取客户端发过来的cookie name=zfpx; count=1
 var cookie = req.headers.cookie;
 var count = 1;//初始值1
 if(cookie){
 var cookieObj = querystring.parse(cookie,'; ');//得到cookie对象
 count = cookieObj.count;//得到count属性赋给count
 if(count){
 count++;
 }else{
 count = 1;
 }
 }
 res.setHeader('Set-Cookie',[`count=${count}`,`count2=${count}`]);

 //res.setHeader('Set-Cookie',`count=${count}`);
 //res.setHeader('Set-Cookie',`count2=${count}`);
 res.send(`欢迎你第${count}次访问本超市`);
 });*/
/**
 * 读取客户端发过来的cookie req.cookies
 * 向客户端写cookie res.cookie('count',1);
 */
app.use(cookieParser());
app.get('/visit', function (req, res) {
    var count = req.cookies.count;
    if (count) {
        count++;
    } else {
        count = 1;
    }
    res.cookie('count', count);
    res.end(`欢迎你${count}次光临`)
})
app.listen(9090);
