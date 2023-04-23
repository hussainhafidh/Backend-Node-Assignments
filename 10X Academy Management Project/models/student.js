const mongooose = require('mongoose');
const studentSchema = new mongooose.Schema({
    // Your code goes here
    // _id : Number,
    name: {type : String,required:true},
    classId :{type : Number,required:true},
    
})

const Student = mongooose.model('student', studentSchema);



module.exports = Student;