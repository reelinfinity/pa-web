// meeting.js
const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    organizer: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    }
    
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
