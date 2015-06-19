var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.all('/', function(req, res) {
  // console.log('进来了');
  // console.log(req.params.userName);
  // console.log(req.body.userName);
  // res.send(req.body.userName);
  var newUser = new User({
    userName: req.body.userName,
    userPwd: req.body.userPwd,
    nickName: req.body.nickName,
    userPhone : req.body.userPhone,
    userSex : req.body.userSex,
    userEmail : req.body.userEmail
  });
  // res.send(newUser);
  newUser.save(function(err,user){
    if(err){
      res.send(err+"");
    }else{
      res.send(user.userId+"");
    }
  });
});

module.exports = router;
