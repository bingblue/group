let router = require('express').Router();
let Counters = require('../../models/counters');
let User = require('../../models/user');
/*
 * 创建数据库
 */
router.all('/createUserIdTable', function(req, res) {
  let newCounters = new Counters({
    _id: "userid",
    seq: 100000
  });
  newCounters.save(function(err,user){
    if(err){
      req.json.code = 903;
      req.json.msg = "Counters表读取错误!";
      req.json.body = err+"";
    }else{
      req.json.msg = "创建成功!";
      req.json.body = user;
    }
    res.json(req.json);
  });
});
/*
 * 创建邀请码
 */
router.all('/createInvitationCode', function(req, res) {
  let updateCounters = {
    userId : req.param('userId'),
    invitationCode : req.param('invitationCode'),
    invitationCodeNum : req.param('invitationCodeNum')
  }
  if(updateCounters.invitationCode == undefined){
    updateCounters.invitationCode = randomString(8);
  }
  if(updateCounters.invitationCodeNum == undefined){
    updateCounters.invitationCodeNum = 10;
  }
  User.createInvitationCodeByUserId(updateCounters,function(err,user){
   if(err){
     req.json.code = 903;
     req.json.msg = "Users表读取错误!";
     req.json.body = err+"";
   }else{
     req.json.msg = "邀请码创建成功!";
     req.json.body = {userId:user.userId,invitationCode:user.invitationCode};
   }
   res.json(req.json);
  });
});

//生产随机字符串
function randomString(len = 16) {
  /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    
  let maxPos = $chars.length;
  let pwd = '';
  for (i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
module.exports = router;