'use strict';

var mongoose = require('mongoose');

var dishSchema = new mongoose.Schema({
  dish: String,
  chef: String,
  votes: Number
});

module.exports = mongoose.model('Dish', dishSchema);

