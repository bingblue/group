var crypto = require('crypto');
var mongoose = require('./db');
var counters = require('./counters');

var userSchema = new mongoose.Schema({
  userId: {//用户ID 类似QQ号
    type: Number,
    exist: true,//是否存在即验证
    unique: true
  },

  //必填字段
  userName: {//用户名
    type: 'String',
    required: true,//是否必填项
    exist: true,//是否存在即验证
    maxLength: 20,
    minLength: 6
  },
  userPwd: {//密码
    type: 'String',
    required: true
  },
  nickName: {//昵称
    type: 'String',
    maxLength: 80,
    minLength: 1
  },
  userPhone: {
    type: 'String',
    required: true
  },
  userSex: {
    type: 'String',
    required: true,
    enum: ['男','女','人妖']
  },
  userEmail: {
    type: 'String',
    required: true
  },

  //系统生成字段
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
  this.userName = user.userName;
  this.userPwd = user.userPwd;
  this.nickName = user.nickName;
  this.userPhone = user.userPhone;
  this.userSex = user.userSex;
  this.userEmail = user.userEmail;
};

User.prototype.save = function(callback) {
  var password_MD5 = crypto.createHash('md5').update(this.password+"").digest('hex');
  var user = {
    userName: this.userName,
    userPwd: password_MD5,
    nickName: this.nickName,
    userPhone : this.userPhone,
    userSex : this.userSex,
    userEmail : this.userEmail
  };
  counters.getNextSequence("userid",function(err,userId){
    if (err) {
      return callback(err);
    }else{
      user.userId = userId;
      var userEntity = new userModel(user);

      userEntity.save(function (err, user) {
        if (err) {
          return callback(err);
        }
        callback(null, user);
      });
    }
  });

  //如何让mongoose同步呢？
  // var user = {
  //   userId : counters.getNextSequence("userid"),
  //   userName: this.name,
  //   userPwd: password_MD5,
  //   email: this.email,
  //   nickName : "xiaomu"
  // };

  // var userEntity = new userModel(user);

  // userEntity.save(function (err, user) {
  //   if (err) {
  //     return callback(err);
  //   }
  //   callback(null, user);
  // });
};

User.getByName = function(name, callback) {
  userModel.findOne({name: name}, function (err, user) {
    if (err) {
      return callback(err);
    }
    callback(null, user);
  });
};

module.exports = User;