var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var Childs = require('../models/childs.js');


router.get('/getTheChild/:id', function(req, res) {
  Childs.findById(req.params.id, function(err, fouldChild) {
    res.json(fouldChild);
  });
});



router.get('/', function(req, res) {
  Childs.find({}, function(err, foundChildren) {
    res.json(foundChildren);
  });
});

// Add new child
router.post('/add', function(req, res) {
  User.findById(req.body.parentid, function(err, foundUser) {
    Childs.create(req.body, function(err, createdChild) {
      foundUser.child.push(createdChild);
      foundUser.save(function(err, data) {
        // find all children under this parent.
        Childs.find({
          parentid: req.body.parentid
        }, function(err, foundChildren) {

          // return the information including token as JSON
          res.json(foundChildren);

        });
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
      console.log("updatedChildren", updatedChildren);
      Users.findOne({
        'child._id': req.params.id
      }, function(err, foundChild) {
        console.log("foundChild", foundChild);

      });



      res.json(updatedChildren);
    });
});

router.delete('/:id', function(req, res) {
  Childs.findByIdAndRemove(req.params.id, function(err, deletedChildren) {
    res.json(deletedChildren);
  });
});

router.get('/editChild/:id', function(req, res) {
  console.log("req.body.parentId", req.params.id);
  Childs.find({
    parentid: req.params.id
  }, function(err, foundChild) {
    res.json(foundChild);
  });
});



module.exports = router;
