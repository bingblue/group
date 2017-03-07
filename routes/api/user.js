const router = require('express').Router();
const User = require('../../models/user');
const crypto = require('crypto');

const multer = require('multer');
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/temp');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
})

let upload = multer({ storage: storage });
// let upload = multer({ 
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
  let userName = req.param('userName');
  User.getByUserName(userName,function(err,user){
    req.json.msg = "可以注册!";
    req.json.body = {valid:true,userName:userName};
    if(err){
      req.json.code = 901;
      req.json.msg = 'User表读取错误';
      req.json.body = err+"";
    }else{
      if(user){
        req.json.code = 10000;
        req.json.msg = "用户名已注册";
        req.json.body.valid = false;
      }
    }
    res.json(req.json);
  });
});
/*
 * 用户注册
 */
router.all('/reg', function(req, res) {
  let newUser = new User({
    userName: req.param('userName'),
    userPwd: req.param('userPwd'),
    nickName: req.param('nickName'),
    userPhone : req.param('userPhone'),
    userSex : req.param('userSex'),
    userEmail : req.param('userEmail')
  });
  newUser.save(function(err,user){
    if(err){
      req.json.code = 902;
      req.json.msg = "注册失败!";
      req.json.body = err+"";
    }else{
      req.json.msg = "注册成功!";
      req.json.body = user;
    }
    res.json(req.json);
  });
});

//用户登录
router.all('/login', function(req, res) {
  let userName = req.param('userName');
  let userPwd = req.param('userPwd');
  let md5 = crypto.createHash('md5'),
  password = md5.update(userPwd).digest('hex');
  User.getByUserName(userName,function(err,user){
    if(err){
      req.json.code = 902;
      req.json.msg = "数据库错误!";
      req.json.body = err+"";
    }else{
      if (!user) {
        req.json.code = 1001;
        req.json.msg = "用户名或密码错误!";
        req.json.body = "用户不存在!";
      }else{
        req.json.msg = "登陆成功!";
        req.json.body = user;
        //检查密码是否一致
        if (user.userPwd != password) {
          req.json.code = 1001;
          req.json.msg = "用户名或密码错误!";
          req.json.body = "密码错误!";
        }
      }
      res.json(req.json);
    }
  });
});

//http://localhost/api/user/reg?userName=mumumu1&userPwd=123123&nickName=小木木&userPhone=15000785080&userSex=男&userEmail=895355044@qq.com

/*
 * 上传头像
 */
router.all('/upload', upload.single('upload-avatar'),function(req, res) {
  console.log(req.file);
  req.flash('success', '文件上传成功!');
  res.redirect('/upload');
});

module.exports = router;