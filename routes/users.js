var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
/*
 * 用户注册
 */
router.post('/add', function(req, res) {
  var newUser = new User({
    userName: req.body.userName,
    userPwd: req.body.userPwd,
    nickName: req.body.nickName,
    userPhone : req.body.userPhone,
    userSex : req.body.userSex,
    userEmail : req.body.userEmail
  });
  newUser.save(function(err,user){
    if(err){
      req.flash('error', err);
      return res.redirect('/reg');//注册失败返回主册页
    }else{
      req.session.user = user;//用户信息存入 session
      req.flash('success', '注册成功!');
      res.redirect('/');//注册成功后返回主页
    }
  });
});

/*
 * 用户更新
 */
router.post('/update', function(req, res) {
  var updateUser = {
    userName: req.body.userName,
    nickName: req.body.nickName,
    userPhone : req.body.userPhone,
    userSex : req.body.userSex,
    userEmail : req.body.userEmail
  };
  User.updateByUserName(updateUser,function(err,user){
    if(err){
      res.send(err+"");
    }else{
      console.log(user);
      res.redirect('back');
      res.render('update', { title: '用户信息更新完成' ,user:user});
    }
  });
});
/*
 * 用户登录
 */
router.post('/login', function(req, res) {
  var userName = req.body.userName;
  var userPwd = req.body.userPwd;
  var md5 = crypto.createHash('md5'),
  password = md5.update(userPwd).digest('hex');
  User.getByUserName(userName,function(err,user){
    if(err){
      res.send(err+"");
    }else{
      if (!user) {
        req.flash('error', '用户不存在!'); 
        return res.redirect('/login');//用户不存在则跳转到登录页
      }
      //检查密码是否一致
      if (user.userPwd != password) {
        req.flash('error', '密码错误!'); 
        return res.redirect('/login');//密码错误则跳转到登录页
      }
      //用户名密码都匹配后，将用户信息存入 session
      req.session.user = user;
      req.flash('success', '登陆成功!');
      res.redirect('/');
    }
  });
  
});

/*
 * 按用户名查找用户
 */
router.all('/:userName', function(req, res) {
  var userName = req.params.userName;
  User.getByUserName(userName,function(err,user){
    if(err){
      res.send(err+"");
    }else{
      res.render('update', { title: '用户信息更新' ,user:user});
    }
  });
});
module.exports = router;
