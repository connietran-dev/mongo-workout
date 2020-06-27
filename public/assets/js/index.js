init();

async function init() {
  // location.search = return the querystring part of a URL, e.g., after ?
  if (location.search.split("=")[1] === undefined) {
    // getLastWorkout in api.js
    const workout = await API.getLastWorkout();
    if (workout) {
      location.search = "?id=" + workout._id;
    } else {
      // If no workouts are returned, d-none hides Continue button
      document.querySelector("#continue-btn").classList.add("d-none")
    }
  }
}

