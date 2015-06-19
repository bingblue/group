var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('reg', { title: '用户注册' });
});

module.exports = router;
