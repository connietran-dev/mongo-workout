const db = require("../models");
const mongoose = require("mongoose");

// Because findOneAndUpdate is deprecated, opt in to using MongoDB driver's findOneAndUpdate() function using the useFindAndModify global option
mongoose.set('useFindAndModify', false);

module.exports = (app) => {

    // fetch from getLastWorkout()
    app.get('/api/workouts', async (req, res) => {
        // let dbWorkout = await db.Workout.find({});
        // console.log(dbWorkout);
        // res.json(dbWorkout);
    });

    // PUT from addExercise() in api.js
    app.put('/api/workouts/:id', (req, res) => {
        console.log("Incoming request /api/workouts/:id: ", req.body);
        // Find the Workout that matches the id in the URL 
        // Then push exercise onto Exercise array
        // new: true - always create a new one
        db.Exercise.create(req.body)
            .then(dbExercise => {
                console.log("Exercise added: ", dbExercise);
                let workoutId = req.params.id;
                console.log("Current workout: ", workoutId);
                return db.Workout.findOneAndUpdate({ _id: workoutId }, { $push: { exercises: dbExercise._id } }, { new: true })
            })
            .then(dbWorkout => {
                console.log("Updated workout: ", dbWorkout);
                res.json(dbWorkout);
            })
            .catch(err => {
                console.log("Error: ", err);
                res.json(err);
            });
    });

    // POST from createWorkout() in api.js
    app.post('/api/workouts', ({ body }, res) => {
        console.log("Incoming request /api/workouts: ", body);
        db.Workout.create(body)
            .then(dbWorkout => {
                console.log("New workout created: ", dbWorkout);
                res.json(dbWorkout);
            })
            .catch(({ message }) => {
                console.log(message);
            });
    });

    app.get('/api/workouts/range', (req, res) => {

    });
};