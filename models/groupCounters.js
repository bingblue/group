var mongoose = require('./db');

var groupCountersSchema = new mongoose.Schema({
  _id: String,
  seq: Number
}, {
  collection: 'groupCounters' 
});
groupCountersSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
};
var groupCountersModel = mongoose.model('groupCounters', groupCountersSchema);

function GroupCounters(groupCounters) {
  this._id = groupCounters._id;
  this.seq = groupCounters.seq;
};

GroupCounters.prototype.save = function(callback) {
  var groupCounters = {
    _id: "groupId",
    seq: 100000
  };

  var groupCountersEntity = new groupCountersModel(groupCounters);

  groupCountersEntity.save(function (err, groupCounters) {
    if (err) {
      return callback(err);
    }
    callback(null, groupCounters);
  });
};
GroupCounters.getNextSequence = function(name,callback) {
  groupCountersModel.findAndModify({}, [], { $inc: { seq: 1 } }, {'new':true, "upsert": true}, function (err,ret) {
    if (err) {
      callback(err);
    }else{
      callback(null,ret.value.seq);
    }
  });
};

module.exports = GroupCounters;