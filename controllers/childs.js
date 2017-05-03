var express = require('express');
var router = express.Router();
var Childs = require('../models/childs.js');

router.get('/', function(req, res) {
  console.log("in child");
  Childs.find({}, function(err, foundChildren) {
    res.json(foundChildren);
  });
});

router.post('/', function(req, res) {
  Childs.create(req.body, function(err, createdChildren) {
    res.json(createdChildren);
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
