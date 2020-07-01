init();

async function init() {
  // location.search = return the querystring part of a URL, e.g., after ?
  console.log('location.search.split("=")[1]: ', location.search.split("=")[1]);
  
  // If there is no location.search, then getLastWorkout()
  if (location.search.split("=")[1] === undefined) {
    // getLastWorkout in api.js
    const workout = await API.getLastWorkout();
    console.log("Last workout (index.js): ", workout);
    
    // Otherwise, if workout does exist, add to query string
    if (workout) {
      location.search = "?id=" + workout._id;
    } else {
      // If no workouts are returned, d-none hides Continue button
      document.querySelector("#continue-btn").classList.add("d-none")
    }
  }
}

