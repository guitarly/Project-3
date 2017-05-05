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
  if (!checkCreditCard(req.body.creditCard)) {
    res.json({
      error: "Credit Card number is not valid.",
      isSuccess: false
    });
  } else {


    var children = req.body.children;
    var parentId = null;

    for (var i = 0; i < children.length; i++) {
      // children[i]
      var amount = parseInt(children[i].amount);

      if (amount > 0) {
        var totalFund = 0;
        if (children[i].funds === null) {
          children[i].funds = amount;
        } else {

          totalFund = children[i].funds += amount;
        }

        delete children[i].amount;
        var childId = children[i]._id;
        parentId = children[i].parentid;

        Children.findByIdAndUpdate(childId, {
          funds: totalFund
        }, {
          new: true
        }, function(err, model) {
          if (err) {
            error: err
          };



        }) // end children.findByIdAndUpdate

      } // end if

    } // end for loop

    Children.find({
      parentid: parentId
    }, function(err, foundChildren) {

      // return the information including token as JSON
      res.json({
        children: foundChildren,
        error: "Updated success.",
        isSuccess: true
      });

    });


  }



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
