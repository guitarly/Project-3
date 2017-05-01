var express = require('express');
var app = express();
var port = 3001 || process.env.PORT;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
// ----
var session = require('express-session');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var passport = require('passport');
var localStrategy = require('passport-local').
Strategy;


mongoose.connect('mongodb://localhost:27017/project3');

var port = process.env.PORT || 3001;
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/project3';

app.use(bodyParser.json());
app.use(express.static('public'));

// Express session
app.use(session({
  secret: 'dsafadsfdsfewr2342sdfs',
  saveUninitialized: false,
  resave: false
}));
// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;
    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));
// connect flash
app.use(flash());
// Global Vars
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.session.user;

  next();
});

var usersController = require('./controllers/users.js');
app.use('/users', usersController);
var loginController = require('./controllers/logincontroller.js');
app.use('/login', loginController);
var childsController = require('./controllers/childs.js');
app.use('/childs', childsController);
var mealsController = require('./controllers/meals.js');
app.use('/meals', mealsController);


mongoose.connection.once('open', function() {
  console.log("connection .. mongodb");
});

app.listen(port, function() {
  console.log('=======================');
  console.log('Running on port ' + port);
  console.log('=======================');
});
