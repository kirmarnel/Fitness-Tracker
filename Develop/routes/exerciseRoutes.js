const router = require("express").Router();
const path = require('path');
const db = require('../models/');

//html routes
router.get('/exercise', (req, res) => {
    console.log(res)
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
    db.Workout.find({})
      .then(dbWorkout => {
        console.log(dbWorkout);
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });
  
  
  router.post('/api/workouts', ({ body }, res) => {
    db.Workout.create(body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });
  
  
  router.put('/api/workouts/:id', (req, res) => {
    db.Workout.updateOne(
      { _id: req.params.id },
      { $push: { exercises: req.body } }
    )
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });


  router.get('/api/workouts/range', (req, res) => {
    db.Workout.find({})
      .sort({ _id: -1 })
      .limit(7)
      .then(dbWorkout => {
        console.log(dbWorkout);
        res.json(dbWorkout);
        console.log(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });


module.exports = router