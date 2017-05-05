var express = require('express');
var router = express.Router();
var Users = require('../models/users.js');
var Children = require('../models/childs.js');

// Get current User (parent)
router.get('/getParent/:id', function(req, res) {
  Users.findById(req.params.id, function(err, foundUser) {
    res.json(foundUser);
  });
});


router.get('/', function(req, res) {
  console.log("in User");
  Users.find({}, function(err, foundUsers) {
    res.json(foundUsers);
  });
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

router.post('/updatedFund', function(req, res) {

  console.log("I am in the UpdatedFund");
  console.log(req.body.creditCard);
  console.log(req.body.children);
  if (!checkCreditCard(req.body.creditCard)) {
    res.json({
      error: "Credit Card number is not valid.",
      isSuccess: false
    });
  } else {
    res.json({
      error: "Credit Card number is valid.",
      isSuccess: true
    });
  }
  // let creditCardNumber = req.body.currentUser.creditCard;
  // let children = req.body.currentUser.child;
  // let childIdsArray = []
  // for (var i = 0; i < children.length; i++) {
  //   if (children[i].amount) {
  //     console.log(children[i].amount);
  //   }
  // }



});

function checkCreditCard(cardNo) {
  if (cardNo.length !== 16) {
    return false;
  }
  return true;
}

module.exports = router;
