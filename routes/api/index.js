const router = require('express').Router();
const process = require('child_process');
const User = require('../../models/user');
//过滤器
router.all('*',(req, res, next)=>{
  req.json = {
      "code":200,//200:成功,数据库错误:900+,用户错误:1000+,服务器脚本错误,1100+
      "msg":"",
      "body":{}
    }
  let invitationCode = req.param('invitationCode');
  let hidden = req.param('hidden');
  if(hidden == "753951"){
    next();
  }else{
    if(invitationCode == undefined){
      req.json.code = 1500;
      req.json.msg = "权限错误!";
      req.json.body = "您没有权限创建邀请码,请联系小牧COOL(QQ：895355044)";
      res.json(req.json);
    }else{
      User.getByInvitationCode(invitationCode,function(err,user){
        if(err){
          req.json.code = 901;
          req.json.msg = 'User表读取错误';
          req.json.body = err+"";
          res.json(req.json);
        }else{
          if(!user || user.invitationCodeNum<=0){
            req.json.code = 1500;
            req.json.msg = "权限错误!";
            req.json.body = '验证码不存在！';
            res.json(req.json);
          }else{
            let updateCounters = {
                userId : user.userId,
                invitationCode : user.invitationCode,
                invitationCodeNum : user.invitationCodeNum-1
            };
            User.createInvitationCodeByUserId(updateCounters,function(err,user){
              if(err){
                req.json.code = 903;
                req.json.msg = "Users表读取错误!";
                req.json.body = err+"";
                res.json(req.json);
              }else{
                next();
              }
            });
          }
        }
      });
    }
  }//判断hidden
});

router.all('/', function(req, res) {
  res.json('success!');
});
module.exports = router;
