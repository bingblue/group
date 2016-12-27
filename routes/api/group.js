var router = require('express').Router();
var Counters = require('../../models/counters');
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
module.exports = router;