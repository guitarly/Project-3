var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var Users = require('../models/users.js');
var path = require('path');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/database.js'); // get our config file

router.post('/', function(req, res) {

  if (req.body.password) {
    Users.findOne({
      username: req.body.username
    }, function(err, foundUser) {
      if (!foundUser) {
        // req.flash('error_msg', 'No User Found');
        // console.log("No User found");
        // res.json("No user found");

        res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        });

      } else {

        if (bcrypt.compareSync(req.body.password, foundUser.password, function(err, res) {
            if (err) {

              res.json({
                success: false,
                message: 'Wrong password.'
              });
            }
          })) {
          console.log("iam here...in the server - login ok");
          // passed.. login good
          // res.json(foundUser);
          var token = jwt.sign(foundUser, config.secret, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
          });

          // return the information including token as JSON
          res.json({
            user: foundUser,
            success: true,
            message: 'Successful Login',
            token: token
          });

        } else {
          res.json({
            success: false,
            message: 'Wrong password.'
          });
        }

      }
    });

  } else {
    res.json({
      success: false,
      message: 'Wrong password.'
    });

  }

});

// create new record
router.post('/register', function(req, res) {
  var firstName = req.body.firstname;
  var lastName = req.body.lastname;
  var username = req.body.username;
  var password = req.body.password;
  // var password_confirm = req.body.password_confirm;

  // Validation
  req.assert('password', '6 to 20 characters required').len(6, 20);
  req.checkBody('firstname', 'First name is required').notEmpty();
  req.checkBody('lastname', 'Last name is required').notEmpty();
  req.checkBody('username', 'Username is required.').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  // req.checkBody('password_confirm', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();
  if (errors) {
    console.log(errors);
  }

  Users.findOne({
    username: req.body.username
  }, function(err, foundUser) {
    if (!err) {
      if (foundUser) {
        // req.flash('error_msg', 'The username is already taken.');
        res.json("The username is already taken.");
      } else {
        // Create new USER with bcrypt password
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        Users.create(req.body, function(err, createdUser) {
          if (err) throw err;
          // req.flash('success_msg', "You are registered can now login.");
          // res.json(createdUser);
          res.json({
            user: createdUser,
            success: true,
            message: 'Create User Success'
          });
        });

      }
    }

  });
  // }



  //----------


});




module.exports = router;
