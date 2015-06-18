var crypto = require('crypto');
var mongoose = require('./db');
var counters = require('./counters');

var userSchema = new mongoose.Schema({
  //必填字段
  userName: {//用户名
    type: 'String',
    required: true,//是否必填项
    exist: true //是否存在即验证
  },
  userPwd: {//密码
    type: 'String',
    required: true
  },
  nickName: {//昵称
    type: 'String'
  },
  email: {
    type: 'String',
    required: true
  },

  //系统生成字段
  userId: {//用户ID 类似QQ号
    type: Number
  },
  userStatus: {//用户状态 1.正常 2.在线、3离线、0封禁
    type: Number,
    default: 1
  },
  userLvl: {//用户等级
    type: Number,
    default: 1
  },
  userVip: {//VIP等级
    type: Number,
    default: 0
  },
  regDate: {//注册时间
    type: Date,
    default: Date.now
  }
}, {
  collection: 'users' 
});

var userModel = mongoose.model('Users', userSchema);

function User(user) {
  this.name = user.name;
  this.password = user.password;
  this.email = user.email;
};

User.prototype.save = function(callback) {
  var email_MD5 = crypto.createHash('md5').update(this.email.toLowerCase()).digest('hex');
  var head = "http://www.gravatar.com/avatar/" + email_MD5 + "?s=48";
  var password_MD5 = crypto.createHash('md5').update(this.password).digest('hex');

  var user = {
    userName: this.name,
    userPwd: password_MD5,
    email: this.email,
    userId : counters.getNextSequence("userid"),
    nickName : "xiaomu"
  };

  var userEntity = new userModel(user);

  userEntity.save(function (err, user) {
    if (err) {
      return callback(err);
    }
    callback(null, user);
  });
};

User.get = function(name, callback) {
  userModel.findOne({name: name}, function (err, user) {
    if (err) {
      return callback(err);
    }
    callback(null, user);
  });
};

module.exports = User;