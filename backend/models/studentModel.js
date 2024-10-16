const mongoose = require('mongoose');


// Schema for the Student model
const studentSchema = new mongoose.Schema(
    {
        studentId: {
            type: String,
            default: generateStudentId,
            unique: true,
        },
        firstName : {
            type: String,
            required: true,
            trim: true,
        },
        lastName : {
            type: String,
            required: true,
            trim: true,
        },
        usn : {
            type: String,
            required: true,
            unique: true,
        },        
        phoneNumber : {
            type: String,
            required: true,
        },
        emailId : {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email already exists"],
            match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "email is invalid"],
            lowercase: true,
        },
        password : {
            type: String,
            required: [true, "password is required"],
            minlength: [8, "password must be at least 8 characters long"],
            maxlength: [20, "password must be at most 16 characters long"],
            trim: true,
        }
    }
);

// Custom function to generate a student ID
function generateStudentId() {
    const min = 1000;   // minimum 4-digit number
    const max = 999999; // maximum 6-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Create the model class using schema
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;