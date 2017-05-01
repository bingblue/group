const router = require('express').Router();

//过滤器
router.all('*',(req, res, next)=>{
  next();
});

//
router.get('/', (req, res)=>{
  res.sendfile('views/dzp/01.html');
});
//
router.get('/01.html', (req, res)=>{
  res.sendfile('views/dzp/01.html');
});
//
router.get('/02.html', (req, res)=>{
  res.sendfile('views/dzp/02.html');
});
//
router.get('/er.html', (req, res)=>{
  res.sendfile('views/dzp/er.html');
});
//
router.get('/mygift.html', (req, res)=>{
  res.sendfile('views/dzp/mygift.html');
});



module.exports = router;
