const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const Instructor = require('../models/instructor');

router.post('/add-course', courseController.addCourse);
router.get('/getCourses', courseController.getCourses);
router.put('/updateCourses', courseController.updateCourses);
router.delete('/deleteCoursesById', courseController.deleteCoursesById);
router.get('/search', courseController.searchCourseByTitle);
router.get('/getCoursesSortedByRating', courseController.getCoursesSortedByRating);
router.get('/getTotalCount', courseController.getCourseCount);
router.get('/getCourseByinstructor',courseController.getCoursesByInstructor);
router.get('/getCourseByCategory',courseController.getCoursesByCategory);
router.get('/getCourseByLevel',courseController.getCoursesByLevel);


module.exports = router;