const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController');
router.post('/addinstructor', instructorController.addInstructor);
router.get('/getinstructorByNameOrEmail', instructorController.getInstructorByNameOrEmail);
router.get('/getinstructorByFirstName', instructorController.getInstructorByFirstName);
router.put('/updateinstructorByNameOrEmail', instructorController.updateInstructorByNameOrEmail);
// router.delete('/deleteinstructorByNameOrEmail', instructorController.deleteInstructorByNameOrEmail);
router.delete('/deleteinstructorById', instructorController.deleteInstructorById);
router.get('/getinstructors', instructorController.getAllInstructors);
router.get('/instructorsCount',instructorController.getInstructorCount);


module.exports = router;
