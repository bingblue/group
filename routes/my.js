const router = require('express').Router();
const tools = require('../models/tools');
const User = require('../models/user');
const Group = require('../models/group');
const System = require('../models/system');

//过滤器
router.all('*',(req, res, next)=>{
  next();
});

//好友列表
router.get('/friend',tools.checkLogin);
router.get('/friend', (req, res)=>{
  res.render('my_friend', { 
    title: '冰蓝科技 - 我的好友',
    user: req.session.user,
    userFriends:req.session.user.userFriends
  });
});

//查询好友
router.post('/searchFriend',tools.checkLogin);
router.post('/searchFriend', (req, res)=>{
  let nickName = req.param('nickName');
  User.getLikeNickName(nickName,function(err,userList){
    var json = {}
    if(err){
      json.code = 901;
      json.msg = "用户表读取失败！";
      json.body = "err:"+err;
    }else{
      json.code = 200;
      json.msg = "操作成功!";
      json.body = userList;
    }
    res.json(json);
  });
});
//添加好友
router.post('/friendReq',tools.checkLogin);
router.post('/friendReq', (req, res)=>{
  let newSystem = new System({
    systemTitle: '好友请求',
    systemInfo: '请求添加您为好友。',
    systemFrom: req.param('from'),
    systemTo: req.param('to'),
    systemFromNickName: req.param('fromNickName'),
    systemToNickName: req.param('toNickName'),
    systemType:2
  });
  newSystem.save(function(err,system){
    var json = {}
    if(err){
      json.code = 906;
      json.msg = "添加好友失败!";
      json.body = "请重试:"+err;
    }else{
      json.code = 200;
      json.msg = "添加好友请求已发送!";
      json.body = system;
    }
    res.json(json);
  });
});
//获取系统消息
router.post('/system',tools.checkLogin);
router.post('/system', (req, res)=>{
  let systemTo = req.param('systemTo');
  System.getPartBySystemTo(systemTo,2,function(err,systemList){
    var json = {}
    if(err){
      json.code = 906;
      json.msg = "查询系统消息失败!";
      json.body = "请重试:"+err;
    }else{
      json.code = 200;
      json.msg = "查询成功!";
      json.body = systemList;
    }
    res.json(json);
  });
});
//系统消息页面
router.get('/system',tools.checkLogin);
router.get('/system', (req, res)=>{
  let systemTo = req.session.user.userId;
  System.getPartBySystemTo(systemTo,2,function(err,systemList){
    res.render('my_system', { 
      title: '冰蓝科技 - 我的系统消息',
      user: req.session.user,
      systemList:systemList
    });
  });
});
//同意好友请求
router.post('/agreeFriend',tools.checkLogin);
router.post('/agreeFriend', (req, res)=>{
  let to = req.param('to');
  let from = req.param('from');
  let sys = {
    _id:req.param('id'),
    systemStatus:4
  }
  let json = {};
  let updateList = [{
    userId : to,
    userFriends:from
  },{
    userId : from,
    userFriends:to
  }];

  //System.updateById(sys,function(err,system){
  //  if(err){
  //    json.code = 906;
  //    json.msg = "添加好友失败！";
  //    json.body = "请重试:"+err;
  //    res.json(json);
  //  }else{
  //    User.updateListByUserId(updateList,function(err,user){
  //      if(err){
  //        json.code = 906;
  //        json.msg = "添加好友失败";
  //        json.body = "请重试:"+err;
  //      }else{
  //        json.code = 200;
  //        json.msg = "添加好友成功！";
  //        json.body = "success!";
  //      }
  //      res.json(json);
  //    });
  //  }
  //});
});
//拒绝好友请求
router.post('/refuseFriend',tools.checkLogin);
router.post('/refuseFriend', (req, res)=>{
  let update = {
    _id:req.param('id'),
    systemStatus:4
  }
  System.updateById(update,function(err,system){
    let json = {}
    if(err){
      json.code = 906;
      json.msg = "拒绝好友失败！";
      json.body = "请重试:"+err;
    }else{
      json.code = 200;
      json.msg = "已拒绝好友请求!";
      json.body = system;
    }
    res.json(json);
  });
});


module.exports = router;
