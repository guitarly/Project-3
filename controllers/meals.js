var express = require('express');
var router = express.Router();
var Meals = require('../models/meals.js');

router.get('/', function(req, res) {
  console.log("in child");
  Meals.find({}, function(err, foundMeal) {
    res.json(foundMeal);
  });
});

router.post('/', function(req, res) {
  Meals.create(req.body, function(err, createdMeal) {
    // console.log(createdMeal);
    // res.json(createdMeal);
  });
  Meals.find({}, function(err, foundMeal) {
    res.json(foundMeal);
  });
});

router.get('/display', function(req, res) {
  // Meals.create(req.body, function(err, createdMeal) {
  //   console.log(createdMeal);
  //   res.json(createdMeal);
  // });
  console.log('iam in display');

  Meals.find({}, function(err, foundMeal) {
    res.json(foundMeal);
  });
});

router.delete('/:id', function(req, res) {
  Meals.findByIdAndRemove(req.params.id, function(err, deletedMeal) {
    res.json(deletedMeal);
  });
});

router.put('/:id', function(req, res) {
  Meals.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, function(err, updatedMeal) {
    res.json(updatedMeal);
  });
});

module.exports = router;
