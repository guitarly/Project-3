var express = require('express');
var router = express.Router();
var Users = require('../models/users.js');



router.get('/', function(req, res) {
  console.log("in User");
  Users.find({}, function(err, foundUsers) {
    res.json(foundUsers);
  })
  // Users.find({}, function(err, foundUsers) {
  //
  //   res.json(foundUsers);
  // });
});

// create new record
router.post('/', function(req, res) {
  console.log("iam in userPost", req.body);
  // Users.create(req.body, function(err, info) {
  //   console.log(req.body);
  //   // res.json(info);
  // });
});

module.exports = router;
