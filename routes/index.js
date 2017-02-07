const router = require('express').Router();
const tools = require('../models/tools');
//过滤器
router.all('*',(req, res, next)=>{
  next();
})

router.get('/', function(req, res) {
  res.render('index', { 
    title: '冰蓝科技 - 首页',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});
router.get('/reg',tools.checkNotLogin);
router.get('/reg', function(req, res) {
  res.render('reg', {
    title: '冰蓝科技 - 注册',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});
router.get('/login',tools.checkNotLogin);
router.get('/login', function(req, res) {
  res.render('login', {
    title: '冰蓝科技 - 登录',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});

/*
 * 用户登出
 */
router.get('/logout',tools.checkLogin);
router.get('/logout', function (req, res) {
  req.session.user = null;
  req.flash('success', '登出成功!');
  res.redirect('/');//登出成功后跳转到主页
});

router.get('/upload',tools.checkLogin);
router.get('/upload', function(req, res) {
  res.render('upload', {
    title: '冰蓝科技 - 上传图片',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});
module.exports = router;
