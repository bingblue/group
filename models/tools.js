let TOOLS = function(){
  let v = '0.1';
}
TOOLS.prototype = {
  //判断是否登陆
  checkLogin(req, res, next) {
    if (!req.session.user) {
      req.flash('error', '未登录!'); 
      res.redirect('/login');
    }
    next();
  },
  //判断是否未登录
  checkNotLogin(req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登录!');
      res.redirect('back');//返回之前的页面
    }
    next();
  },
  //判断是否是管理员
  checkAdmin(req, res, next) {
    if (!req.session.user || req.session.user.userId != '100001') {
      req.flash('error', '没有权限!!');
      res.redirect('back');
    }
    next();
  },
  //生产随机字符串
  randomString(len = 16) {
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    
    let maxPos = $chars.length;
    let pwd = '';
    for (i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }

}
module.exports = new TOOLS();
