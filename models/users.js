var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String

});

var Users = mongoose.model('Users', usersSchema);

module.exports = Users;
