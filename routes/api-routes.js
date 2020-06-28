const db = require("../models");

module.exports = (app) => {
    // fetch from getLastWorkout()
    app.get('/api/workouts', async (req, res) => {
        // let dbWorkout = await db.Workout.find({});
        // console.log(dbWorkout);
        // res.json(dbWorkout);
    });

    // PUT from addExercise() in api.js
    app.put('/api/workouts/:id', ({ body }, res) => {
        console.log("Incoming request /api/workouts/:id: ", body);
        db.Exercise.create(body)
            // Find the Workout that matches the id in the URL 
            // Then push exercise onto Exercise array
            // new: true - always create a new one
            .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
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