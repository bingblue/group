const router = require('express').Router();
const path = require('path');

//过滤器
router.all('*',(req, res, next)=>{
  next();
});

//
router.get('/', (req, res)=>{
  res.sendfile(path.join(__dirname, '../views/fere/goto.html'));
  //res.sendfile('views/fere/goto.html');
});


module.exports = router;
