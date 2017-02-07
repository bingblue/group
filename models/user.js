var crypto = require('crypto');
var mongoose = require('./db');
var counters = require('./counters');

var userSchema = new mongoose.Schema({
  userId: {//用户ID 类似QQ号
    type: Number,
    unique: true
  },
  // var emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  //必填字段
  userName: {//用户名
    type: 'String',
    required: '用户名不能为空!',//是否必填项
    unique: true,
    match:[/(?!^\d+$)^[0-9a-zA-Z]{6,15}$/, "用户名只能输入数字、字符a-z,且不能全为数字,6~15个字符!"]
  },
  userPwd: {//密码
    type: 'String',
    required: '密码不能为空!'
  },
  nickName: {//昵称
    type: 'String',
    match:[/^[0-9a-zA-Z\u4e00-\u9fa5]{1,20}$/, "昵称只能输入数字、字符a-z、中文,最长20个字符!" ]
  },
  userPhone: {
    type: 'String',
    required: '手机号不能为空!'
  },
  userSex: {
    type: 'String',
    required: true,
    enum: ['男','女','人妖']
  },
  userEmail: {
    type: 'String',
    required: '邮箱不能为空!',
    match:[/[_a-zA-Z\d\-\./]+@[_a-zA-Z\d\-]+(\.[_a-zA-Z\d\-]+)+/,'邮箱格式不正确']
  },
  invitationCode: {
    type: 'String'
  },

  //系统生成字段
  invitationCodeNum: {//邀请码使用次数
    type: Number,
    default: 10
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
  this.userName = user.userName;
  this.userPwd = user.userPwd;
  this.nickName = user.nickName;
  this.userPhone = user.userPhone;
  this.userSex = user.userSex;
  this.userEmail = user.userEmail;
  this.invitationCode = user.invitationCode;
  this.invitationCodeNum = user.invitationCodeNum;
};

User.prototype.save = function(callback) {
  var password_MD5 = crypto.createHash('md5').update(this.userPwd+"").digest('hex');
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
        callback(err, user);
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

User.getByUserName = function(userName, callback) {
  userModel.findOne({userName: userName}, function (err, user) {
    //为啥要if?
    //if (err) {
    //  return callback(err);
    //}
    //callback(null, user);
    callback(err, user);
  });
};

User.updateByUserName = function(updateUser, callback) {
  userModel.findOneAndUpdate({userName: updateUser.userName},{$set:updateUser},{new:true},function (err, user) {
    callback(err, user);
    // userModel.findById(user._id, function (err, user) {
    //   if (err) {
    //     return callback(err);
    //   }
    //   callback(null, user);
    // });
    //findOneAndUpdate 方法返回的是修改前的数据，WTF！
    //已解决：设置options{new:true}
  });
};
User.createInvitationCodeByUserId = function(updateUser, callback) {
  userModel.findOneAndUpdate({userId: updateUser.userId},{$set:updateUser},{new:true},function (err, user) {
    callback(err, user);
  });
};
User.getByInvitationCode = function(invitationCode, callback) {
  userModel.findOne({invitationCode: invitationCode}, function (err, user) {
    callback(err, user);
  });
};

User.getUserList = function(callback) {
  userModel.find(function (err, userList) {
    callback(err, userList);
  });
};
module.exports = User;