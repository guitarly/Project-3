var mongoose = require('mongoose');

var mealsSchema = mongoose.Schema({
  menu: String,
  cost: String,
  date: Date
});

var Meals = mongoose.model('Meals', mealsSchema);
module.exports = Meals;
