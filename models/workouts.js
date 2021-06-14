const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({

    day: {
        type: Date,
        default: Date.now()
    },
    exercises: [{
        type: {
            type: String,
            required: 'Please enter a type of exercise'
        },
        name: {
            type: String,
            required: 'Please enter a name of exercise'
        },
        duration: {
            type: Number
        },
        weight: {
            type: Number
        },
        reps: {
            type: Number
        },
        sets: {
            type: Number
        },
        distance: {
            type: Number
        },
    }]

})

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;

