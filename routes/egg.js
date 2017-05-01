const router = require('express').Router();

//过滤器
router.all('*',(req, res, next)=>{
  next();
});

//
router.get('/', (req, res)=>{
  res.sendfile('views/egg/01.html');
});
//
router.get('/01.html', (req, res)=>{
  res.sendfile('views/egg/01.html');
});
//
router.get('/02.html', (req, res)=>{
  res.sendfile('views/egg/02.html');
});
//
router.get('/03.html', (req, res)=>{
  res.sendfile('views/egg/03.html');
});
//
router.get('/04.html', (req, res)=>{
  res.sendfile('views/egg/04.html');
});



module.exports = router;
