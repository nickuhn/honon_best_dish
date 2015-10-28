var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/dish_dev');

var port = process.env.PORT || 3000;
module.exports = app.listen(port, function() {
  console.log('server running on port: ' + port);
});
