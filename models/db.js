var mongoose = require('mongoose');
var settings = require('./settings');
mongoose.connect('mongodb://'+settings.host+':'+settings.port+'/'+settings.db);

module.exports = mongoose;