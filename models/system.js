const mongoose = require('./db');

const systemSchema = new mongoose.Schema({
  //必填字段
  systemTitle: {//名称 ：好友请求，聊天提醒等
    type: 'String'
  },
  systemInfo: {//内容
    type: 'String'
  },
  systemFrom: {//来源
    type: Number
  },
  systemFromNickName: {//来源名字
    type: 'String'
  },
  systemTo: {//发送给
    type: Number
  },
  systemToNickName: {//发送给名字
    type: 'String'
  },

  //系统生成字段
  systemType: {//1:聊天提醒,2:好友请求 
    type: Number,
    default: 2
  },
  systemRegDate: {//注册时间
    type: Date,
    default: Date.now
  },
  systemStatus: {//1:未读 2:已读 3:已发送 4:取消 5:成功/同意
    type: Number,
    default: 1
  }
}, {
  collection: 'systems'
});

var systemModel = mongoose.model('Systems', systemSchema);

function System(system) {
  this.systemTitle = system.systemTitle;
  this.systemInfo = system.systemInfo;
  this.systemFrom = system.systemFrom;
  this.systemTo = system.systemTo;
  this.systemFromNickName = system.systemFromNickName;
  this.systemToNickName = system.systemToNickName;
  this.systemType = system.systemType;
  this.systemStatus = system.systemStatus;
};

System.prototype.save = function(callback) {
  var system = {
    systemName: this.systemName,
    systemInfo: this.systemInfo,
    systemFrom: this.systemFrom,
    systemTo: this.systemTo,
    systemFromNickName: this.systemFromNickName,
    systemToNickName: this.systemToNickName,
    systemType: this.systemType,
    systemStatus: this.systemStatus
  };
  let systemEntity = new systemModel(system);
  systemEntity.save(function (err, system) {
    callback(err, system);
  });
};

System.getBySystemTo = function(systemTo, callback) {
  systemModel.find({systemTo: systemTo}, function (err, systemList) {
    callback(err, systemList);
  });
};
System.getPartBySystemTo = function(systemTo, systemType,callback) {
  systemModel.find({systemTo: systemTo,systemType:systemType,systemStatus:1}, function (err, systemList) {
    callback(err, systemList);
  });
};
System.updateById = function(update,callback) {
  console.info('console.log(update)',update)
  systemModel.findOneAndUpdate({_id: update._id},{$set:update},{new:true},function (err, system) {
    callback(err, system);
  });
};
module.exports = System;