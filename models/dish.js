var mongoose = require('mongoose');

var dishSchema = new mongoose.schema({
  dish: String,
  chef: String
});

module.exports = mongoose.model('Dish', dishSchema);

