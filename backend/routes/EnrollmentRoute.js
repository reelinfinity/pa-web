const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const authenticateToken = require('../middlewares/authuser');

// Route to enroll students in courses
router.post('/studentenroll', authenticateToken, enrollmentController.enrollStudentInCourses);
router.post('/enroll',authenticateToken,enrollmentController.enrollStudents);
router.get('/getEnrolledStudentsInCourse',enrollmentController.getEnrolledStudentsInCourse);    
router.get('/getEnrolledCoursesByStudent',enrollmentController.getEnrolledCoursesByStudent);


module.exports = router;
