const express = require('express')
const app = express()
const MyClass = require("./models/class");
const Student =  require("./models/student");
const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(express.json());

// ----------------To CREATE class -----------------
app.post("/v1/myClass",(req,res)=>{
    console.log(req.body);
    const user = new MyClass(req.body);
    user
      .save() //.save() this method returns promisse,The save() method uses either the insert or the update command
      .then(() => {
        res.status(201).json({
          status: "suceess",
          _id: user._id,
        });
      })
      .catch((e) => {
        res.json({
          status: "failuer",
          Result: e.message,
        });
      });
})
// -----------------Register a new student to class----------
app.post("/v1/myClass/:myClassId/students",(req,res)=>{
    let id1 = req.params.myClassId;
    
    console.log(req.body);
    const user = new Student(req.body);
    user
      .save() //.save() this method returns promisse,The save() method uses either the insert or the update command
      .then(() => {
        res.status(201).json({
          status: "suceess",
          studentId: user._id,
        });
      })
      .catch((e) => {
        res.json({
          status: "failuer",
          Result: e.message,
        });
      });
})


//------------------get all classes--------------------

app.get("/v1/myClass", async(req,res)=>{
    
    let classes;
    try {
       
        classes = await MyClass.find();
      // console.log(users);
    } catch (err) {
      console.log(err);
    }
    if (! classes) {
      return res.status(404).json({ message: "No classes found" });
    }
    return res.status(200).json({
      message: "succses",
      classes,
    });
   
})

// // -------------------Get a specific class by id----------------------
app.get("/v1/myClass/:id", async(req,res)=>{
    let id = req.params.id;
    let classs;
    try {
       
        classs = await MyClass.findById(id)
      // console.log(users);
    } catch (err) {
      console.log(err);
    }
    if (! classs) {
      return res.status(404).json({ message: "No class of this id found" });
    }
    return res.status(200).json({
      message: "succses",
      classs,
    });
})

// -------------------Delete a specific class-------------------
app.delete("/v1/myClass/:myClassId", async(req,res)=>{
const id = req.params.myClassId;
console.log(id);
let tasks = await MyClass.findById(id);
try {
   await MyClass.findByIdAndRemove(id,(data)=>{
    return res.status(204).json({
        message: "succses",
        tasks,
      });
   })
} catch (err) {
   console.log(err);
   return res.status(404).json({ message: "No class of this id found" });
}
})

// -------------------Delete a specific student-------------------
app.delete("/v1/myClass/:myClassId/students/:studentId", async(req,res)=>{
    const id1 = req.params.myClassId;
    const id2 = req.params.studentId;

    console.log(id2);
    let classs = await MyClass.findById(id1);
    let student =await Student.findById(id2);
    try {
       await Student.findByIdAndRemove(id2,(data)=>{
        return res.status(204).json({
            message: "succses",
            student,
          });
       })
    } catch (err) {
        return res.status(404).json({ message: "No student of this id found" });

    }
    })


//-----------------Edit the title or completion of a specific task-------------------
app.put("/v1/myClass/:myClassId/students/:studentId",async(req,res)=>{
    let id1 = req.params.myClassId;
    let id2 = req.params.studentId;
  try {
     console.log(req.body);
   
    const task = await Student.updateOne({ _id: id2 }, req.body);
    res.status(204).json({
      status: "Success",
      task,
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
    });
  }
})


//---------------------------------- Get one student details------------------
app.get("/v1/myClass/:myClassId/students/:studentId", async(req,res)=>{
    let id1 = req.params.myClassId;
    let id2 = req.params.studentId;

    let classs;
    try {
       
        classs = await Student.findById(id2)
      // console.log(users);
    } catch (err) {
      console.log(err);
    }
    if (! classs) {
      return res.status(404).json({ message: "No student of this id found" });
    }
    return res.status(200).json({
      message: "succses",
      classs,
    });
})

//-----------------------Get all students in a specific class---------------------
app.get("/v1/myClass/:myClassId/students", async(req,res)=>{
    let id1 = req.params.myClassId;
    let id2 = req.params.studentId;
console.log(id1);
    let students;
    try {
       
        students = await Student.find()
      // console.log(users);
    } catch (err) {
      console.log(err);
    }
    if (! students) {
      return res.status(404).json({ message: "No student of this id found" });
    }
    return res.status(200).json({
      
        students,
    });
})




module.exports = app