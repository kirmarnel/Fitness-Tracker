const router = require("express").Router();
const path = require('path');
const workouts = require('../models/workouts');


router.get('/api/workouts', (req, res) => {
  workouts.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration'
        }
      }
    }
  ])

    .then((exercise) => {
      console.log(exercise)
      res.json(exercise);
    })
    .catch(err => {
      res.json(err);
    });
});


router.post('/api/workouts', (req, res) => {
  workouts.create({})
    .then(exercise => {
      res.json(exercise);
    })
    .catch(err => {
      res.json(err);
    });
});


router.put('/api/workouts/:id', (req, res) => {
  console.log(req.body)
  workouts.updateOne(
    { _id: req.params.id },
    { $push: { exercises: req.body } }
  )
    .then(exercise => {
      res.json(exercise);
    })
    .catch(err => {
      res.json(err);
    });
});


router.get('/api/workouts/range', (req, res) => {
  workouts.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration'
        }
      }
    }
  ])
    .limit(7)
    .then((exercise) => {
      res.json(exercise);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router
