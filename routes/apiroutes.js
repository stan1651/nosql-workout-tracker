const Workout = require("../models/workout.js")
const router = require('express').Router()

router.post("/api/workouts", (req, res) => {
Workout.create({})
.then((dbWorkout) => {
    res.json(dbWorkout)
})
.catch((err) => {
    res.json(err);
});
});

router.put("/api/workouts/:id", ({body, params}, res) => {
    Workout.findByIdAndUpdate(
        params.id, 
        {$push: {exercises: body}},
        {new: true, runValidators: true}
        )
    .then((dbWorkout) => {
        res.json(dbWorkout)
    }).catch((err) => {
        res.json(err);
    });
});

//router.get("/api/workouts", (req, res) => {
//add totalDuration 
  //  Workout.aggregate([{
    //    $group: {_id: null,
      //  "totalDuration": {
        //    $sum: "$Amount"
        //}
    //}
    //}])
    //.then((dbWorkout) => {
      //  res.json(dbWorkout);
    //});
//});
router.get("/api/workouts", (req, res) => {
    Workout.find({}).then(data => res.json(data))
    .catch(err => {
        console.log("error", err);
        res.json(err);
      });
});

router.get("/api/workouts/range", (req, res) => {
   Workout.find({})
   .sort({ _id: -1 })
   .limit(7)
   .then(dbWorkout => {
       console.log(dbWorkout);
       res.json(dbWorkout);
       console.log(dbWorkout);
   })
   .catch(err => {
       res.json(err);
   });
});    

module.exports = router;