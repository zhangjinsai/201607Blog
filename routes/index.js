var express = require('express');
var Article = require('../db').Article;
var router = express.Router();
/**
 * 1. 引入文章Model
 * 2. 查找所有的文章列表
 * 3. 渲染模板，在模板中迭代articles，每篇文章对应一个media
 */
router.get('/',function(req,res){
    //读取所有的文章数组并用来渲染模板
    //populate就是填充的意思，把就是把某个属性从字段串转成对应对象
    Article.find({}).populate('user').exec(function(err,docs){
        res.render('index',{title:'首页',articles:docs});
    });
});
module.exports = router;