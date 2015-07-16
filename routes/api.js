var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
/*
 * 检查用户名是否重复
 */
router.all('/isRepeatByName', function (req, res) {
  var userName = req.body.userName;
  User.getByUserName(userName,function(err,user){
    if(err){
      res.send(err+"");
    }else{
      if(user){
        res.json({valid: false});
      }else{
        res.json({valid: true});
      }
    }
  });
});
/*
 * 用户注册
 */
router.all('/reg', function(req, res) {
  
});

module.exports = router;
