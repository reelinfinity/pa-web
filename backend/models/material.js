// material.js

const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    course: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    materialLink: {
        type: String,
        required: true
    }
});

const Material = mongoose.model('Material', materialSchema);

module.exports = Material;
