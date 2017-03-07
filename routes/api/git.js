var router = require('express').Router();
var process = require('child_process');

router.all('/push', function(req, res) {
  process.execFile('/usr/local/src/group/tools/pull.sh',null,{cwd:'/usr/local/src/group/'},
    function (error,stdout,stderr) {
    if (error !== null) {
      req.json.code = 1101;
      req.json.msg = "push脚本错误!";
      req.json.body = err+"";
    }else{
      req.json.msg = "push脚本执行成功!";
      req.json.body = "push success!";
    }
    res.json(req.json);
  });
});
module.exports = router;
