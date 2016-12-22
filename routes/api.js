var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Counters = require('../models/counters');
var process = require('child_process');

var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/temp');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
})

var upload = multer({ storage: storage });
// var upload = multer({ 
//   dest: 'public/img/temp',
//   filename:"1"
//   // rename: function (fieldname, filename) {
//   //   //原来文件名
//   //   return filename;
//   //   //return Date.now()+filename;
//   // }
// });

/* GET users listing. */
/*
 * 检查用户名是否重复
 */
router.all('/isRepeatByName', function (req, res) {
  var userName = req.param('userName');
  User.getByUserName(userName,function(err,user){
    
    var json = {
        "code":200,
        "msg":"可以注册！",
        "body":{
          valid: true,
          userName:userName
        }
      }
    if(err){
      res.send(err+"");
    }else{
      if(user){
        json.code = 10000;
        json.msg = "用户名已注册";
        json.body.valid = false;
      }
      res.json(json);
    }
  });
});
/*
 * 用户注册
 */
router.all('/reg', function(req, res) {
  
});

/*
 * 上传头像
 */
router.all('/upload', upload.single('upload-avatar'),function(req, res) {
  console.log(req.file);
  req.flash('success', '文件上传成功!');
  res.redirect('/upload');
});

/*
 * 创建数据库
 */
router.all('/createID', function(req, res) {
  var newCounters = new Counters({
    _id: "userid",
    seq: 100000
  });
  newCounters.save(function(err,user){
    if(err){
      req.flash('error', err);
      res.redirect('/');
    }else{
      req.flash('success', "创建成功！");
      res.redirect('/');
    }
  });
});
router.all('/git/push', function(req, res) {
  console.log(req);
  process.execFile('/usr/local/src/group/tools/pull.sh',null,{cwd:'/usr/local/src/group/'},
    function (error,stdout,stderr) {
    if (error !== null) {
      res.json('exec error: ' + error);
    }else{
      res.json('success!');
    }
  });
});
module.exports = router;
