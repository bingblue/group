const router = require('express').Router();
const tools = require('../models/tools');
const Group = require('../models/group');

//过滤器
router.all('*',(req, res, next)=>{
  next();
});

//聊天
router.get('/chat',tools.checkLogin);
router.get('/chat', (req, res)=>{
  let room =  req.param('room');
  res.render('group_chat', { 
    title: '冰蓝科技 - 群聊',
    user: req.session.user,
    groupId:room
  });
});

//聊天列表
router.get('/',tools.checkLogin);
router.get('/', (req, res)=>{
  Group.getGroupList((err,groupList)=>{
    if(err){
      res.send(err+"");
    }else{
      res.render('group_list', { 
        title: '冰蓝科技 - 群聊列表',
        user: req.session.user,
        groupList:groupList
      });
    }
  })
});

//创建群
router.get('/userList',tools.checkAdmin);
router.get('/crateGroup', (req, res)=>{
  
});
module.exports = router;
