const db = require("../models");

module.exports = (app) => {
    // fetch from getLastWorkout()
    app.get('/api/workouts', async (req, res) => {
        // let dbWorkout = await db.Workout.find({});
        // console.log(dbWorkout);
        // res.json(dbWorkout);
    });

    app.put('/api/workouts', (req, res) => {

    });

    // POST from createWorkout() in exercise.js
    app.post('/api/workouts', ({ body }, res) => {
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