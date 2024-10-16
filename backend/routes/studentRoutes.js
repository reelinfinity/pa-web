const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Routes accessible only to admin
router.post('/addStudents', studentController.addStudent);
router.get('/getAllStudentsDetails', studentController.getStudentByDetails);
router.get('/getStudentByNameOrEmail', studentController.getStudentByNameOrEmail);
router.put('/updateStudentByNameOrEmail', studentController.updateStudentByNameOrEmail);
router.delete('/deleteStudentByNameOrEmail', studentController.deleteStudentByNameOrEmail);
router.get('/getStudentByDetails', studentController.getStudentByDetails);
router.delete('/deleteStudentById', studentController.deleteStudentById);
router.get('/getStudentsCount',studentController.getStudentCount);
module.exports = router;

