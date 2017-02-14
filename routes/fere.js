const router = require('express').Router();

//过滤器
router.all('*',(req, res, next)=>{
  next();
});

//
router.get('/', (req, res)=>{
  res.render('reg',{
    title:'111',
    error:null,
    success:null
  });
  //res.sendfile('views/fere/goto.html');
});


module.exports = router;
