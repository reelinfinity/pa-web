const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    phone:{
        type: String,
        required: [true, "phone is required"],
        unique: [true, "phone already exists"],
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
        
        enum: ['admin', 'instructor', 'student'],
        default: 'student'
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }


});

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;