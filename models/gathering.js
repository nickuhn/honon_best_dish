var mongoose = require('mongoose');

var gatheringSchema = new mongoose.schema({
  date: {type: Date, default: Date.now},
  dishes: [{type: Schema.Types.ObjectId, ref: 'Dish'}]
});

module.exports = mongoose.model('Gathering', gatheringSchema);
