var mongoose = require('mongoose');
var Meal = require('./meals.js');
var usersSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  role: String,
  child: [Meal.schema]

});

var Users = mongoose.model('Users', usersSchema);

module.exports = Users;
