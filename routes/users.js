var express = require('express');
var router = express.Router();
var User = require('../models/user');
var crypto = require('crypto');
//var mongoose = require('mongoose');//引用mongoose模块
//var db = mongoose.createConnection('localhost','users');//创建一个数据库连接
//var db = 'mongodb://localhost/users';

/* GET users listing. */
router.get('/', function(req, res) {
  var md5 = crypto.createHash('md5');
  var newUser = new User({
    name: "XiaoMuCOOL2",
    password: "abc123",
    email: "a59769507@hotmail.com",
  })
  newUser.save(function(err,user){
    res.send(user.regDate.time+"");
  });
  //mongoose.connect(db);
  //console.log('11');
  //db.on('error',console.error.bind(console,'连接错误:'));
  //db.once('open',function(){
  // mongoose.connection.on('connected',function(){
  //   var PersonSchema = new mongoose.Schema({
  //     age:Number
  //   });
  //   var PersonModel = mongoose.model('Persons',PersonSchema);
  //   var personEntity = new PersonModel({age:2});
  //   console.log(personEntity.age); 
  //   personEntity.save(function(err){
  //     if(err){
  //       console.log(err);
  //     }else{
  //       console.log('Success save');
  //     }
  //   });
  // });
  
});

module.exports = router;
