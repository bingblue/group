const router = require('express').Router();

//过滤器
router.all('*',(req, res, next)=>{
  next();
});

//
router.get('/', (req, res)=>{
  res.sendfile('views/fbb/01.html');
});
//
router.get('/01.html', (req, res)=>{
  res.sendfile('views/fbb/01.html');
});

module.exports = router;
