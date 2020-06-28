/** Selectors **/
const workoutTypeSelect = document.querySelector("#type");
const cardioForm = document.querySelector(".cardio-form");
const resistanceForm = document.querySelector(".resistance-form");
const cardioNameInput = document.querySelector("#cardio-name");
const nameInput = document.querySelector("#name");
const weightInput = document.querySelector("#weight");
const setsInput = document.querySelector("#sets");
const repsInput = document.querySelector("#reps");
const durationInput = document.querySelector("#duration");
const resistanceDurationInput = document.querySelector("#resistance-duration");
const distanceInput = document.querySelector("#distance");
const completeButton = document.querySelector("button.complete");
const addButton = document.querySelector("button.add-another");
const toast = document.querySelector("#toast");
const newWorkout = document.querySelector(".new-workout")

let workoutType = null;
let shouldNavigateAway = false;


/** Event Listeners **/

document
  .querySelectorAll("input")
  .forEach(element => element.addEventListener("input", validateInputs));

// When Exercise Type dropdown changes to non-null value (Resistance or Cardio), change form fields and validateInputs
if (workoutTypeSelect) {
  workoutTypeSelect.addEventListener("change", handleWorkoutTypeChange);
}

// If Complete button is enabled, when clicked, set shouldNavigateAway to true and submit form
if (completeButton) {
  completeButton.addEventListener("click", function (event) {
    shouldNavigateAway = true;
    handleFormSubmit(event);
  });
}
// After submitting form and end of toast's animation, set location.href = "/" to redirect to homepage, because shouldNavigateAway = true
toast.addEventListener("animationend", handleToastAnimationEnd);

if (addButton) {
  addButton.addEventListener("click", handleFormSubmit);
}


/** Main Functions **/

/** Create Workout if it does not yet exist **/

async function initExercise() {
  let workout;

  console.log('Query string: ', location.search.split("=")[1]);

  // If workout does not yet exist, create a new workout
  if (location.search.split("=")[1] === undefined) {
    workout = await API.createWorkout();
    console.log("Response from createWorkout: ", workout);
  }

  // If workout exists, set query string to workout_id which will reload page with that id
  console.log("workout: ", workout);
  if (workout) {
    location.search = "?id=" + workout._id;
  }

}

initExercise();


/** Create Exercise on Submit**/

async function handleFormSubmit(event) {
  event.preventDefault();

  let workoutData = {};

  if (workoutType === "cardio") {
    workoutData.type = "cardio";
    workoutData.name = cardioNameInput.value.trim();
    workoutData.distance = Number(distanceInput.value.trim());
    workoutData.duration = Number(durationInput.value.trim());
  } else if (workoutType === "resistance") {
    workoutData.type = "resistance";
    workoutData.name = nameInput.value.trim();
    workoutData.weight = Number(weightInput.value.trim());
    workoutData.sets = Number(setsInput.value.trim());
    workoutData.reps = Number(repsInput.value.trim());
    workoutData.duration = Number(resistanceDurationInput.value.trim());
  }

  // Call addExercise with workoutData object created
  await API.addExercise(workoutData);
  clearInputs();
  toast.classList.add("success");
}


/** Form Functions **/

// Change form fields based on Exercise Type (Resistance or Cardio)
function handleWorkoutTypeChange(event) {
  workoutType = event.target.value;

  if (workoutType === "cardio") {
    cardioForm.classList.remove("d-none");
    resistanceForm.classList.add("d-none");
  } else if (workoutType === "resistance") {
    resistanceForm.classList.remove("d-none");
    cardioForm.classList.add("d-none");
  } else {
    cardioForm.classList.add("d-none");
    resistanceForm.classList.add("d-none");
  }

  validateInputs();
}

function validateInputs() {
  // Set isValid to true by default
  // If any of the form fields are blank, set isValid to false
  let isValid = true;

  if (workoutType === "resistance") {
    if (nameInput.value.trim() === "") {
      isValid = false;
    }

    if (weightInput.value.trim() === "") {
      isValid = false;
    }

    if (setsInput.value.trim() === "") {
      isValid = false;
    }

    if (repsInput.value.trim() === "") {
      isValid = false;
    }

    if (resistanceDurationInput.value.trim() === "") {
      isValid = false;
    }
  } else if (workoutType === "cardio") {
    if (cardioNameInput.value.trim() === "") {
      isValid = false;
    }

    if (durationInput.value.trim() === "") {
      isValid = false;
    }

    if (distanceInput.value.trim() === "") {
      isValid = false;
    }
  }

  // If isValid is still true, keep Complete and Add Exercise buttons enabled
  if (isValid) {
    completeButton.removeAttribute("disabled");
    addButton.removeAttribute("disabled");
  } else {
    completeButton.setAttribute("disabled", true);
    addButton.setAttribute("disabled", true);
  }
}

function handleToastAnimationEnd() {
  toast.removeAttribute("class");
  if (shouldNavigateAway) {
    location.href = "/";
  }
}

function clearInputs() {
  cardioNameInput.value = "";
  nameInput.value = "";
  setsInput.value = "";
  distanceInput.value = "";
  durationInput.value = "";
  repsInput.value = "";
  resistanceDurationInput.value = "";
  weightInput.value = "";
}