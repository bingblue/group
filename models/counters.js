var crypto = require('crypto');
var mongoose = require('./db');

var countersSchema = new mongoose.Schema({
  _id: String,
  seq: Number
}, {
  collection: 'counters' 
});
countersSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
};
var countersModel = mongoose.model('counters', countersSchema);

function Counters(counters) {
  this._id = counters._id;
  this.seq = counters.seq;
};

Counters.prototype.save = function(callback) {
  var counters = {
    _id: "userid",
    seq: 100000
  };

  var countersEntity = new countersModel(counters);

  countersEntity.save(function (err, counters) {
    if (err) {
      return callback(err);
    }
    callback(null, counters);
  });
};
Counters.getNextSequence = function(name,callback) {
  // var promise = new mongoose.Promise();
  // countersModel.findAndModify({}, [], { $inc: { seq: 1 } }, {'new':true, "upsert": true}, function (err,ret) {
  //   if (err) throw err;
  //   console.log(ret.value.seq);
  //   // promise.resolve.bind(promise)(err, ret.value.seq);
  //   promise.resolve(ret.value.seq);
  // });
  // console.log(promise);
  // return promise;
  // console.log(promise);
  // 原始方法
  countersModel.findAndModify({}, [], { $inc: { seq: 1 } }, {'new':true, "upsert": true}, function (err,ret) {
    if (err) {
      callback(err);
    }else{
      callback(null,ret.value.seq);
    }
  });
  // promise 用法错误
  // var promise = countersModel.findAndModify({}, [], { $inc: { seq: 1 } }, {'new':true, "upsert": true}).exec();
  // console.log(promise);
  // return promise;
};

module.exports = Counters;