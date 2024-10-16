const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
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
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "email is invalid"]
    },

    
     
    message: {
        type: String,
        trim: true,
        maxlength: [200, "message must be within 200 characters"]
    }
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
