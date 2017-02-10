const mongoose = require('./db');
const groupCounters = require('./groupCounters');

const groupRecordSchema = new mongoose.Schema({
  recordFrom:{//发送者
    type: Number
  },
  recordFromNickName:{//发送者名字
    type: 'String'
  },
  recordTo:{//接收者
    type: Number
  },
  recordToNickName:{//接收者名字
    type: 'String'
  },
  recordDate:{//发送时间
    type: Date,
    default: Date.now
  },
  recordContent:{//发送内容
    type: 'String'
  }
});
const groupSchema = new mongoose.Schema({
  groupId: {//群号
    type: Number,
    unique: true
  },
  //必填字段
  groupName: {//群名
    type: 'String',
    required: '群名不能为空!',//是否必填项
    match:[/(?!^\d+$)^[0-9a-zA-Z\u4e00-\u9fa5]{2,15}$/, "群名只能输入数字、字符a-z,且不能全为数字,2~15个字符!"]
  },
  groupIntro: {//简介
    type: 'String'
  },
  groupAuthor: {//作者或创建者,为userId
    type: Number
  },
  groupAuthorNickName: {//作者或创建者名字
    type: 'String'
  },
  blogContent: {//博客内容
    type: 'String'
  },
  //选填
  groupRecord: {//聊天记录
    type: [groupRecordSchema]
  },
  groupMembers:{//成员
    type: [Number],
    default: 0
  },
  onlineNum:{//在线人数
    type: Number,
    default: 0
  },
  totalNum:{//总人数
    type: Number,
    default: 0
  },

  //系统生成字段
  groupType: {//1:群,2:私人聊天,3:博客,4:站内信
    type: Number,
    default: 2
  },
  groupLvl: {//群等级
    type: Number,
    default: 1
  },
  groupVip: {//VIP等级
    type: Number,
    default: 0
  },
  groupRegDate: {//注册时间
    type: Date,
    default: Date.now
  }
}, {
  collection: 'groups'
});

var groupModel = mongoose.model('Groups', groupSchema);

function Group(group) {
  this.groupName = group.groupName;
  this.groupIntro = group.groupIntro;
  this.groupAuthor = group.groupAuthor;
  this.groupAuthorNickName = group.groupAuthorNickName;
  this.blogContent = group.blogContent;
  this.groupRecord = group.groupRecord;
  this.groupType = group.groupType;
  this.groupLvl = group.groupLvl;
  this.groupVip = group.groupVip;
};

Group.prototype.save = function(callback) {
  var group = {
    groupName: this.groupName,
    groupIntro: this.groupIntro,
    groupAuthor: this.groupAuthor,
    groupAuthorNickName: this.groupAuthorNickName,
    blogContent: this.blogContent,
    groupRecord: this.groupRecord,
    groupType: this.groupType,
    groupLvl: this.groupLvl,
    groupVip: this.groupVip
  };
  groupCounters.getNextSequence("groupId",function(err,groupId){
    if (err) {
      return callback(err);
    }else{
      group.groupId = groupId;
      var groupEntity = new groupModel(group);
      groupEntity.save(function (err, group) {
        callback(err, group);
      });
    }
  });
};

Group.getByGroupId = function(groupId, callback) {
  groupModel.findOne({groupId: groupId}, function (err, group) {
    callback(err, group);
  });
};

Group.updateByGroupId = function(updateGroup, callback) {
  groupModel.findOneAndUpdate({groupId: updateGroup.GroupId},{$set:updateGroup},{new:true},function (err, group) {
    callback(err, group);
  });
};

Group.getGroupList = function(callback) {
  groupModel.find({groupType: 1},function (err, groupList) {
    callback(err, groupList);
  });
};
Group.getUserRecordList = function(callback) {
  groupModel.find({groupType: 2},function (err, userRecordList) {
    callback(err, userRecordList);
  });
};
Group.getBlogList = function(callback) {
  groupModel.find({groupType: 3},function (err, blogList) {
    callback(err, blogList);
  });
};
Group.getSysList = function(callback) {
  groupModel.find({groupType: 4},function (err, sysList) {
    callback(err, sysList);
  });
};
module.exports = Group;