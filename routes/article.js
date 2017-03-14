var express = require('express');
var Article = require('../db').Article;
var router = express.Router();
router.get('/add', function (req, res) {
    res.render('article/add',{title:'发表文章',article:{}});
});
//保存文章
/**
 * 1. 得到表单的内容，请求体保存到了req.body
 * 2. req.body.createAt = new Date()
 * 3. req.body.user = 当前登录的用户的_id req.session.user._id
 * 4. 取得文章的Model，create方法保存此对象
 * 5. 如果保存失败，跳回发表文章页面继续填写，如果保存失败跳转到首页
 */
router.post('/add',function(req, res){
    var article = req.body;// title content
    var _id = article._id;
    if(_id){//如果把ID传过来了意味着是修改
        Article.update({_id},{
            $set:{
                title:article.title,
                content:article.content
            }
        },function(err,result){
            if(err){
                res.redirect('back');
            }else{
                res.redirect('/article/detail/'+_id);
            }
        });
    }else{
        article.createAt = new Date();
        //把原来的空的_id删除掉，以便mongoose帮你自动生成一个新的ID
        delete article._id;
        //文章的user属性引用用户_id属性
        article.user = req.session.user._id;
        Article.create(article,function(err,doc){
            if(err){
                console.error(err);
                //返回上一个页面
                res.redirect('back');
            }else {
                res.redirect('/');
            }
        });
    }
});
/**
 * 1.把标题变成超链接
 * 2. 点击超链接向服务器提交请求，传递文章的_id,
 * 3.服务器端要处理路由，从_id得到文章对象并渲染文章详情页模板
 */
router.get('/detail/:_id',function(req,res){
  Article.findById(req.params._id,function(err,doc){
      res.render('article/detail',{title:'文章详情',article:doc});
  })
});
//删除文章
router.get('/delete/:_id',function(req,res){
  Article.remove({_id:req.params._id},function(err,result){
      if(err){
          res.redirect('back');
      }else{
          res.redirect('/');
      }
  });
});

router.get('/update/:_id',function(req,res){
   Article.findById(req.params._id,function(err,doc){
       res.render('article/add',{title:'编辑文章',article:doc});
   })
});

module.exports = router;