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


    var children = req.body.children;

    for (var i = 0; i < children.length; i++) {
      // children[i]
      if (children[i].amount) {
        var amount = parseInt(children[i].amount);
        var totalFund = children[i].funds += amount;
        delete children[i].amount;
        var childId = children[i]._id;
        var parentid = children[i].parentid;
        console.log(totalFund);

        Children.findByIdAndUpdate(childId, {
          funds: totalFund
        }, {
          new: true
        }, function(err, model) {
          if (err) {
            error: err
          };
          console.log(model);




          res.json({
            error: "Credit Card number is valid.",
            isSuccess: true
          });

        })





      } // end if

    } // end for loop




    // res.json({
    //   error: "Credit Card number is valid.",
    //   isSuccess: true
    // });
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
  var validCard = function(num) {

    var numberArr = num.toString().split('');

    for (var i = numberArr.length - 2; i >= 0; i -= 2) {
      numberArr[i] = numberArr[i] * 2;
    }

    numberArr = numberArr.join('').split('');

    var summed = numberArr
      .map(function(n) {
        return n = parseInt(n);
      })
      .reduce(function(sum, m) {
        return sum + m;
      });

    return summed % 10 == 0;
  };
  return validCard(cardNo);
}

module.exports = router;
