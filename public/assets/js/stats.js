// Instead of using a separate /api/workouts/range call to get all workout data from back-end, I have simplified and am using the same app.get route to fetch all workout data
// I then manipulate and transform the data on the client-side as shown below

fetch("/api/workouts")
  .then(response => {
    console.log("/api/workouts/range response (stats.js): ", response);
    return response.json();
  })
  .then(data => {
    console.log("Chart data (All workouts): ", data);
    populateChart(data);
  });


// I also commented out this function for the same reasons in the comments above
// This function is also a duplicate call for workouts in a range as the fetch("/api/workouts/range") that was previously declared above

// API.getWorkoutsInRange()


function populateChart(data) {

  /** Chart: Total Duration per Workout **/

  // Calculate dates of workouts to dynamically display x-axis based on dates of workouts
  // The previous code hard-coded "Sunday" through "Saturday"
  let workoutDates = calcWorkoutDates(data);
  console.log("workoutDates: ", workoutDates);

  // I modified the original function to ensure we get the totalDuration of each *workout* as a separate point in the line graph
  // The original duration() function returned the duration of each *exercise*
  let workoutDurations = calcWorkoutDuration(data);
  console.log("Total durations for each workout: ", workoutDurations);


  /** Chart: Pounds Lifted per Workout **/

  let workoutPounds = calcWorkoutPounds(data);
  console.log("Total pounds for each workout: ", workoutPounds);


  /** Chart: Total Minutes per Cardio Exercise **/

  let cardioWorkouts = getCardioWorkouts(data);
  console.log("Cardio workouts: ", cardioWorkouts);

  let cardioDurations = calcCardioDuration(data);
  console.log("Total durations for each cardio exercise: ", cardioDurations);


  /** Chart: Total Pounds per Resistance Exercise **/

  let resistanceWorkouts = getResistanceWorkouts(data);
  console.log("Resistance workouts: ", resistanceWorkouts);

  let resistancePounds = calcResistancePounds(data);
  console.log("Total pounds for each resistance exercise: ", resistancePounds);


  const colors = generatePalette();

  // Line graph, bar graph, and 2 pie charts for canvas, canvas2, 3, 4, respectively
  // .getContext draws on the <canvas> element in the HTML
  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");


  /** Chart: Total Duration per Workout **/

  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: workoutDates,
      datasets: [
        {
          label: "Workout Duration (min)",
          backgroundColor: "#FF7C42",
          borderColor: "#FF7C42",
          data: workoutDurations,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Total Duration per Workout (min)"
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            },
            ticks: {
              autoSkip: false,
              maxRotation: 90,
              minRotation: 45
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            },
            stepSize: 10
          }
        ]
      }
    }
  });

  /** Chart: Pounds Lifted per Workout **/

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: workoutDates,
      datasets: [
        {
          label: "Pounds",
          data: workoutPounds,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Pounds Lifted per Workout"
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  /** Chart: Total Minutes per Cardio Exercise **/

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: cardioWorkouts,
      datasets: [
        {
          label: "Minutes",
          backgroundColor: colors,
          data: cardioDurations
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Total Minutes per Cardio Exercise"
      }
    }
  });

  /** Chart: Total Pounds per Resistance Exercise **/

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: resistanceWorkouts,
      datasets: [
        {
          label: "Pounds",
          backgroundColor: colors.reverse(),
          data: resistancePounds
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Total Pounds per Resistance Exercise"
      }
    }
  });
}


/** Workout Data **/

function calcWorkoutDates(data) {
  let workoutDates = [];

  data.forEach(workout => {
    let formattedDate = moment(workout.day).format('lll');
    workoutDates.push(formattedDate);
  });

  return workoutDates;
};

function calcWorkoutDuration(workouts) {
  let durations = [];

  // For each workout
  workouts.forEach(workout => {
    let calcDuration = 0;
    // Take each exercise within each workout
    workout.exercises.forEach(exercise => {
      // And add each exercise duration to get the totalDuration(calcDuration) for that workout
      calcDuration += exercise.duration;
    });
    // Then push the totalDuration for that workout onto durations array to render the chart
    durations.push(calcDuration);
  });

  return durations;
}

function calcWorkoutPounds(data) {
  let total = [];

  // For each workout
  data.forEach(workout => {
    let workoutPounds = 0;
    // Get each exercise
    workout.exercises.forEach(exercise => {
      // If it is a resistance exercise, then add exercise.weight to workoutPoudnds for the workout
      if (exercise.type === "resistance") {
        workoutPounds += exercise.weight;

        // If it is a cardio exercise, add 0 since there are no pounds
        // We must do something for cardio, because exercise.weight does not exist for cardio exercises, causing NaN for the workoutPounds
      } else if (exercise.type === "cardio") {
        workoutPounds += 0;
      }
    });

    // Then push the total pounds for that workout onto the array
    total.push(workoutPounds);
  });

  return total;
}


/** Cardio Data **/

function getCardioWorkouts(data) {
  let workouts = [];

  // For each workout
  data.forEach(workout => {
    // For each exercise, if that exercise.type is cardio, then push the exercise name onto the workouts array
    workout.exercises.forEach(exercise => {
      if (exercise.type === "cardio") {
        workouts.push(exercise.name);
      }
    });
  });

  return workouts;
};

function calcCardioDuration(workouts) {
  let durations = [];

  // For each workout
  workouts.forEach(workout => {
    let calcDuration = 0;
    // Take each exercise within each workout
    workout.exercises.forEach(exercise => {
      // If the exercise is resistance,
      // Then add each exercise duration to get the totalDuration(calcDuration) for that workout
      if (exercise.type === "cardio") {
        calcDuration += exercise.duration;
      }
    });
    // Then push the totalDuration for that workout onto durations array to render the chart
    durations.push(calcDuration);
  });

  return durations;
}


/** Resistance Data **/

function getResistanceWorkouts(data) {
  let workouts = [];

  // For each workout
  data.forEach(workout => {
    // For each exercise, if that exercise.type is resistance, then push the exercise name onto the workouts array
    workout.exercises.forEach(exercise => {
      if (exercise.type === "resistance") {
        workouts.push(exercise.name);
      }
    });
  });

  return workouts;
}

function calcResistancePounds(workouts) {
  let pounds = [];

  // For each workout
  workouts.forEach(workout => {
    let exercisePounds = 0;
    // Take each exercise within each workout
    workout.exercises.forEach(exercise => {
      // If the exercise is resistance,
      // Then add that exercise's weight onto the array to match up with the getResistancWorkouts
      if (exercise.type === "resistance") {
        pounds.push(exercise.weight);
      }
    });
  });

  return pounds;
}

function generatePalette() {
  const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600"
  ]

  return arr;
}