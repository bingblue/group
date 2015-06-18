var crypto = require('crypto');
var mongoose = require('./db');

var userSchema = new mongoose.Schema({
  name: {
    type: 'String',
    required: true,//是否必填项
    exist: true //是否存在即验证
  },
  password: {
    type: 'String',
    required: true
  },
  email: {
    type: 'String',
    required: true
  },
  regDate:{
    type: Date,
    default: Date.now
  },
  head: String
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
      name: this.name,
      password: password_MD5,
      email: this.email,
      head: head
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