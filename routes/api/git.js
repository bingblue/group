var router = require('express').Router();
var process = require('child_process');

router.all('/push', function(req, res) {
  console.log(req);
  process.execFile('/usr/local/src/group/tools/pull.sh',null,{cwd:'/usr/local/src/group/'},
    function (error,stdout,stderr) {
    if (error !== null) {
      res.json('exec error: ' + error);
    }else{
      res.json('success!');
    }
  });
});
module.exports = router;
