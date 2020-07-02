const API = {

  /** Get All Workouts **/
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/workouts");
      console.log("getLastWorkout res: ", res);
    } catch (err) {
      console.log("getLastWorkout error: ", err);
    }

    const json = await res.json();
    console.log("getLastWorkout JSON: ", json);
    return json[json.length - 1];
  },

  /** Create New Workout **/
  async createWorkout(data = {}) {
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });
    console.log("Response from createWorkout POST: ", res);

    const json = await res.json();
    return json;
  },

  /** Add New Exercise to Workout **/
  async addExercise(data) {
    const id = location.search.split("=")[1];
    console.log("Current workout ID: ", id);

    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    console.log("Response from addExercise PUT: ", res);

    const json = await res.json();
    return json;
  },

  // I simplified and am not using this function - see detailed comments in stats.js
  
  // async getWorkoutsInRange() {
  //   const res = await fetch(`/api/workouts/range`);
  //   console.log("getWorksoutsInRange: ", res);
  //   const json = await res.json();

  //   return json;
  // },
};
