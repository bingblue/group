let TOOLS = function(){
  let v = '0.1';
}
TOOLS.prototype = {
  checkLogin:function(req, res, next) {
    if (!req.session.user) {
      req.flash('error', '未登录!'); 
      res.redirect('/login');
    }
    next();
  },
  checkNotLogin:function (req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登录!');
      res.redirect('back');//返回之前的页面
    }
    next();
  },
  checkLvl99:function (req, res, next) {
    if (!req.session.user || req.session.user.userLvl<99) {
      req.flash('error', '没有权限!!');
      res.redirect('back');//返回之前的页面
    }
    next();
  }
}
module.exports = new TOOLS();
