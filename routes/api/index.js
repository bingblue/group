const router = require('express').Router();
const process = require('child_process');
//过滤器
router.all('*',(req, res, next)=>{
  req.json = {
      "code":200,//200:成功,数据库错误:900+,用户错误:1000+
      "msg":"",
      "body":{}
    }
  next();
});

router.all('/', function(req, res) {
  res.json('success!');
});
module.exports = router;
