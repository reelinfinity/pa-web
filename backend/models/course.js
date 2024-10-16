const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    instructor: {
        type: String,
        required: true
    },

    duration: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },


    price: {
        type: Number,
        required: true
    },

    rating: {
        type: Number,
        default: 0
    },

    studentsEnrolled: {
        type: Number,
        default: 0
    },

    imageUrl: {
        type: String
    },

    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    },

    prerequisites: {
        type: [String]
    },

    lessons: [{
        lessonTitle: String,
        content: String,
        duration: String,
        videoUrl: String
    }]


}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;


