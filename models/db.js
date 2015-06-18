var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/group');

module.exports = mongoose;