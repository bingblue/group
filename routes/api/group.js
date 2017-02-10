const router = require('express').Router();
const Group = require('../../models/group');

/*
 * 创建群
 */
router.all('/createGroup', function(req, res) {
  let newGroup = new Group({
    groupName: req.param('groupName'),
    groupIntro: req.param('groupIntro'),
    groupAuthor: req.param('groupAuthor'),
    blogContent : req.param('blogContent'),
    groupType : 1
  });
  newGroup.dropIndexes();
  newGroup.save(function(err,group){
    if(err){
      req.json.code = 904;
      req.json.msg = "创建群失败!";
      req.json.body = err+"";
    }else{
      req.json.msg = "创建成功!";
      req.json.body = group;
    }
    res.json(req.json);
  });
});

module.exports = router;