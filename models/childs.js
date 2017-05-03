var mongoose = require('mongoose');

var childsSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  school: String,
  grade: Number,
  funds: Number,
  meals: []

});

var Childs = mongoose.model('Childs', childsSchema);

module.exports = Childs;
