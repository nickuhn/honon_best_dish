'use strict'

var mongoose = require('mongoose');

var gatheringSchema = new mongoose.Schema({
  date: {type: Date, default: Date.now},
  dishes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dish'}]
});

module.exports = mongoose.model('Gathering', gatheringSchema);
