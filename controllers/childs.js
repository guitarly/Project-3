var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var Childs = require('../models/childs.js');

router.get('/', function(req, res) {
  console.log("in child");
  Childs.find({}, function(err, foundChildren) {
    res.json(foundChildren);
  });
});

// Add new child
router.post('/add', function(req, res) {
  console.log(req.body);
  User.findById(req.body.parentid, function(err, foundUser) {
    Childs.create(req.body, function(err, createdChild) {
      foundUser.child.push(createdChild);
      foundUser.save(function(err, data) {
        res.json(createdChild);
      });
    });
  });
});



router.post('/display', function(req, res) {
  Childs.create(req.body, function(err, createdChildren) {
    res.json(createdChildren);
  });
});

router.put('/:id', function(req, res) {
  Childs.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    },
    function(err, updatedChildren) {
      res.json(updatedChildren);
    });
});

router.delete('/:id', function(req, res) {
  Childs.findByIdAndRemove(req.params.id, function(err, deletedChildren) {
    res.json(deletedChildren);
  });
});




module.exports = router;
