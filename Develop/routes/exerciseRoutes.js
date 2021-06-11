const router = require("express").Router();
const path = require('path');
const workouts = require('../models/workouts');

//html routes
router.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/exercise.html'));
});

router.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/stats.html'));
});

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
})

//api routes
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
      res.json(exercise);
    })
    .catch(err => {
      res.json(err);
    });
});


router.post('/api/workouts', ({ body }, res) => {
  workouts.create(body)
    .then(exercise => {
      res.json(exercise);
    })
    .catch(err => {
      res.json(err);
    });
});


router.put('/api/workouts/:id', (req, res) => {
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