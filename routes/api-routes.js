const db = require("../models");
const mongoose = require("mongoose");

// Because findOneAndUpdate is deprecated, opt in to using MongoDB driver's findOneAndUpdate() function using the useFindAndModify global option
mongoose.set('useFindAndModify', false);

module.exports = (app) => {

    /** Get All Workouts **/
    app.get("/api/workouts", (req, res) => {
        db.Workout.find()
            .then(dbWorkouts => {
                console.log("All dbWorkouts: ", dbWorkouts);
                res.json(dbWorkouts);
            })
            .catch(err => {
                console.log("Error GET /api/workouts: ", err);
                res.json(err);
            });
    });

    /** Create New Workout **/
    // POST from createWorkout() in api.js
    app.post('/api/workouts', ({ body }, res) => {
        console.log("Incoming request /api/workouts: ", body);
        db.Workout.create(body)
            .then(dbWorkout => {
                console.log("New workout created: ", dbWorkout);
                res.json(dbWorkout);
            })
            .catch(({ message }) => {
                console.log("Error POST /api/workouts", message);
            });
    });

    /** Add New Exercise to Workout **/
    // PUT from addExercise() in api.js
    app.put('/api/workouts/:id', (req, res) => {

        // Find the Workout that matches the id in the URL 
        // Then push exercise onto Exercise array
        // new: true - always create a new one
        // findByIdAndUpdate() method returns the object that matched the condition before the update operation

        db.Workout.findByIdAndUpdate(
            { _id: req.params.id },
            { $push: { exercises: req.body } },
            function (err, result) {
                if (err) {
                    console.log("Error: ", err);
                    res.send(err);
                } else {
                    console.log("Updated dbWorkout: ", result);
                    res.send(result);
                }
            }
        );
    });
};