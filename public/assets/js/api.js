const API = {
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/workouts");
    } catch (err) {
      console.log("getLastWorkout error: ", err)
    }

    console.log("getLastWorkout res: ", res);
    const json = await res.json();
    console.log("getLastWorkout json: ", json);

    return json[json.length - 1];
  },
  async addExercise(data) {
    const id = location.search.split("=")[1];

    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    console.log("addExercise: ", res);

    const json = await res.json();

    return json;
  },
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
  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    console.log("getWorksoutsInRange: ", res);
    const json = await res.json();

    return json;
  },
};
