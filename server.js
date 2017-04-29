var express = require('express');
var app = express();
var port = 3001 || process.env.PORT;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/project3');

app.use(bodyParser.json());
app.use(express.static('public'));

var usersController = require('./controllers/users.js');
app.use('/users', usersController);
var loginController = require('./controllers/logincontroller.js');
app.use('/login', loginController);


mongoose.connection.once('open', function() {
  console.log("connection .. mongodb");
});

app.listen(port, function() {
  console.log('=======================');
  console.log('Running on port ' + port);
  console.log('=======================');
});
