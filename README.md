# Unit 17 Nosql Homework: Workout Tracker

For this assignment, you'll create a workout tracker. This assignment will require you to create Mongo database with a Mongoose schema and handle routes with Express.

## User Story

* As a user, I want to be able to view create and track daily workouts. I want to be able to log multiple exercises in a workout on a given day. I should also be able to track the name, type, weight, sets, reps, and duration of exercise. If the exercise is a cardio exercise, I should be able to track my distance traveled.

## Business Context

A consumer will reach their fitness goals quicker when they track their workout progress.

## Acceptance Criteria

When the user loads the page, they should be given the option to create a new workout, or continue with their last workout.

The user should be able to:

  * Add exercises to a previous workout plan.

  * Add new exercises to a new workout plan.

  * View multiple the combined weight of multiple exercises on the `stats` page.


## Dashboard Charts

For the charts on the Dashboard (stats.js), I tried to create charts that matched the chart title that was provided. In order to do so, I had to get more specific about the data that was returned for each chart.

The first two charts were asking for data per *workout*. However, the first chart used duration() which was returning the duration for each *exercise* and hard-coded dates on the x-axis to Sunday through Saturday. 

The code for the second chart was doing something similar. Thus, I have made the x-axis dynamic based on the date of workouts and made sure the calculations summarize for the total workout, not per exercise.

The new functions also make it so that the data calculated for the y-axis matches up with the x-axis. 

The last two pie/donut charts were labeled for "Exercises Performed" so had the same data for both but with some items in the legend crossed out because the unit in the chart didn't apply to the exercise, so, pounds didn't apply to cardio exercises.

Thus, I created separate charts for Cardio vs. Resistance Exercises Performed.

You may have also noticed that I went a little crazy with the comments and console.log for stats.js. Because the Exercises array is nested in each Workout, the .forEach loops to really return the data needed for each chart is more complex and nuanced based on what the chart is trying to display. Hopefully, the comments help make it clear exactly what data is isolated for calculation, then what pushed onto the array and what is returned - since the charts either use summary data about the workouts or data about individual exercises.