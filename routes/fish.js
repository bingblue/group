const router = require('express').Router();

//过滤器
router.all('*',(req, res, next)=>{
  next();
});

//
router.get('/', (req, res)=>{
  res.sendfile('views/fish/01.html');
});
//
router.get('/01.html', (req, res)=>{
  res.sendfile('views/fish/01.html');
});
//
router.get('/02.html', (req, res)=>{
  res.sendfile('views/fish/02.html');
});
//
router.get('/03.html', (req, res)=>{
  res.sendfile('views/fish/03.html');
});



module.exports = router;
