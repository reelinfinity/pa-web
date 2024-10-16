const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }
});

const Enrollment = mongoose.model('Enrollment', EnrollmentSchema);

module.exports = Enrollment;
