const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },

    lastname: {
        type: String,
        required: true,
        trim: true
    },

    phone: {
        type: String,
        required: true,
        trim: true
    },


    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email already exists"],
        lowercase: true,
        trim: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "email is invalid"]
    },

    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [8, "password must be at least 8 characters long"],
        maxlength: [20, "password must be at most 16 characters long"],
        trim: true


    },


    role: {
        type: String,
        required: true,
        enum: ['admin', 'instructor', 'student'],
        default: 'student'
    },

    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive'],
        default: 'active'
    }


});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;