var express = require('express');
var router = express.Router();

/* GET home page. */
function checkLogin(req, res, next) {
  if (!req.session.user) {
    req.flash('error', '未登录!'); 
    res.redirect('/login');
  }
  next();
}

function checkNotLogin(req, res, next) {
  if (req.session.user) {
    req.flash('error', '已登录!');
    res.redirect('back');//返回之前的页面
  }
  next();
}
router.get('/', function(req, res) {
  res.render('index', { 
    title: '冰蓝科技 - 首页',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});
router.get('/reg',checkNotLogin);
router.get('/reg', function(req, res) {
  res.render('reg', {
    title: '冰蓝科技 - 注册',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});
router.get('/login',checkNotLogin);
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
router.get('/logout',checkLogin);
router.get('/logout', function (req, res) {
  req.session.user = null;
  req.flash('success', '登出成功!');
  res.redirect('/');//登出成功后跳转到主页
});
module.exports = router;
