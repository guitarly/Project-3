var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var Users = require('../models/users.js');
var path = require('path');

router.post('/', function(req, res) {

  if (req.body.password) {
    Users.findOne({
      username: req.body.username
    }, function(err, foundUser) {
      console.log(foundUser);
      if (!foundUser) {
        req.flash('error_msg', 'No User Found');
        console.log("No User found");
        res.json("No user found");

      } else {

        if (bcrypt.compareSync(req.body.password, foundUser.password, function(err, res) {
            if (err) {
              // req.flash('error_msg', 'Wrong password');
              res.json('Wrong password');
            }
          })) {
          // req.session.currentuser = foundUser;
          res.json(foundUser);
        } else {
          // req.flash('error_msg', 'Wrong password');
          res.json('Wrong password');
        }

      }
    });

  } else {
    // req.flash('error_msg', 'Wrong password');
    res.json('Wrong password');

  }

});

// create new record
router.post('/register', function(req, res) {
  console.log("create User", req.body);
  // Users.create(req.body, function(err, info) {
  //   console.log(req.body);
  //   // res.json(info);
  // });

  //--------

  var firstName = req.body.firstname;
  var lastName = req.body.lastname;
  var username = req.body.username;
  var password = req.body.password;
  // var password_confirm = req.body.password_confirm;

  // Validation
  // req.assert('password', '6 to 20 characters required').len(6, 20);
  // req.checkBody('name', 'Name is required').notEmpty();
  // req.checkBody('username', 'Username is required.').notEmpty();
  // req.checkBody('password', 'Password is required').notEmpty();
  // req.checkBody('password_confirm', 'Passwords do not match').equals(req.body.password);

  // var errors = req.validationErrors();

  // if (errors) {
  //
  // } else {

  Users.findOne({
    username: req.body.username
  }, function(err, foundUser) {
    if (!err) {
      if (foundUser) {
        req.flash('error_msg', 'The username is already taken.');
        res.json("User already exists");
      } else {
        // Create new USER with bcrypt password
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        Users.create(req.body, function(err, createdUser) {
          if (err) throw err;
          req.flash('success_msg', "You are registered can now login.");
          res.json(createdUser);
        });

      }
    }

  });
  // }



  //----------


});




module.exports = router;
