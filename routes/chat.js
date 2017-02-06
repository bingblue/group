var router = require('express').Router();
//过滤器
router.all('*',(req, res, next)=>{
  next();
})
/* GET home page. */
function checkLogin(req, res, next) {
  if (!req.session.user) {
    req.flash('error', '未登录!'); 
    res.redirect('/login');
  }
  next();
}

function checkNotLogin(req, res, next) {
  if (req.session.user) {
    req.flash('error', '已登录!');
    res.redirect('back');//返回之前的页面
  }
  next();
}
router.get('/',checkLogin);
router.get('/', function(req, res) {
  res.render('chat', { 
    title: '冰蓝科技 - 群聊',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
});
module.exports = router;
