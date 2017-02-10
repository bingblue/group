let router = require('express').Router();
let GroupCounters = require('../../models/groupCounters');
let User = require('../../models/user');
let tools = require('../../models/tools');
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
 * 创建群ID数据库
 */
router.all('/createGroupIdTable', function(req, res) {
  let newGroupCounters = new GroupCounters({
    _id: "groupId",
    seq: 1000000
  });
  newGroupCounters.save(function(err,user){
    if(err){
      req.json.code = 903;
      req.json.msg = "GroupCounters表读取错误!";
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
    updateCounters.invitationCode = tools.randomString(8);
  }
  if(updateCounters.invitationCodeNum == undefined){
    updateCounters.invitationCodeNum = 10;
  }
  User.createInvitationCodeByUserId(updateCounters,function(err,user){
   if(err||!user){
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

module.exports = router;