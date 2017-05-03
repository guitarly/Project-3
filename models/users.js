var mongoose = require('mongoose');
var Childs = require('./childs.js');
var usersSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  role: String,
  child: [Childs.schema]

});

var Users = mongoose.model('Users', usersSchema);

module.exports = Users;
