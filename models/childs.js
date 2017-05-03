var mongoose = require('mongoose');
var Meals = require('./meals.js');

var childsSchema = mongoose.Schema({
  parentid: String,
  firstname: String,
  lastname: String,
  school: String,
  grade: Number,
  funds: Number,
  meals: [Meals.schema]

});

var Childs = mongoose.model('Childs', childsSchema);

module.exports = Childs;
