var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.all('/add', function(req, res) {
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
      res.send(err+"");
    }else{
      res.send(user.userId+"");
    }
  });
});
router.all('/update', function(req, res) {
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
router.all('/:name', function(req, res) {
  var name = req.params.name;
  User.getByUserName(name,function(err,user){
    if(err){
      res.send(err+"");
    }else{
      res.render('update', { title: '用户信息更新' ,user:user});
    }
  });
});

module.exports = router;
