var express = require('express');
var path = require('path');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var app = express();
//设置模板引擎
app.set('view engine','html');
//设置模板的存放根目录
app.set('views',__dirname);
//设置模板的渲染函数
app.engine('html',require('ejs').__express);
app.use(express.static(path.join(__dirname,'uploads')));
app.get('/',function(req,res){
    res.sendFile('./index.html',{root:__dirname});
});
/**
 * 1. 需一个表单，表单的 enctype="multipart/form-data"
 * 2. 服务器引入multer中间件，指定上传文件的存放目录
 * 3. 使用multer中间件，使用完后会得到 req.body 存放所有的文本类型的字段
 * 4. req.file 存放上传的文件 filename 是保存在服务器端的文件名
 */
app.post('/post',upload.single('avatar'),function(req,res){
   console.log(req.body);
   console.log(req.file);
   res.render('show',{avatar:req.file.filename});
});
app.listen(9090);