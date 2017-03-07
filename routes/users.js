const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const User = require('../models/user');
const tools = require('../models/tools');

/* GET users listing. */
/*
 * 用户注册
 */
router.post('/add', function(req, res) {
  let invitationCode = req.body.invitationCode;
  let newUser = new User({
    userName: req.body.userName,
    userPwd: req.body.userPwd,
    nickName: req.body.nickName,
    userPhone : req.body.userPhone,
    userSex : req.body.userSex,
    userEmail : req.body.userEmail
  });
  User.getByInvitationCode(invitationCode,function(err,user){
    if(err){
      req.flash('error', err);
      return res.redirect('/reg');//注册失败返回主册页
    }else{
      if(!user || user.invitationCodeNum<=0){
        req.flash('error', "邀请码无效!");
        return res.redirect('/reg');
      }else{
        let updateCounters = {
            userId : user.userId,
            invitationCode : user.invitationCode,
            invitationCodeNum : user.invitationCodeNum-1
        };
        User.createInvitationCodeByUserId(updateCounters,function(err,user){
          if(err){
            req.flash('error', "系统错误!");
            return res.redirect('/reg');
          }else{
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
          }
        });
      }
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
 * 用户列表
 */
router.get('/userList',tools.checkAdmin);
router.get('/userList', function(req, res) {
  var userName = req.params.userName;
  User.getUserList(function(err,userList){
    if(err){
      res.send(err+"");
    }else{
      res.render('user_list', { 
        title: '用户列表' ,
        userList:userList,
        user: req.session.user
      });
    }
  });
});
 /*
 * 按用户名查找用户
 */
router.get('/:userName',tools.checkLogin);
router.get('/:userName', function(req, res) {
  var userName = req.params.userName;
  User.getByUserName(userName,function(err,user){
    if(err){
      res.send(err+"");
    }else{
      res.render('update', { 
        title: '用户信息更新' ,
        user: req.session.user,
        updateUser:user
      });
    }
  });
});
module.exports = router;
