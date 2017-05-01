var mongoose = require('mongoose');

var childsSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  school: String,
  grade: String,
  funds: Number,
  meals: []

});

var Childs = mongoose.model('Child', childsSchema);

module.exports = Childs;
