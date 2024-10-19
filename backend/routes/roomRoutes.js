const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');  // Import the controller

// Routes for room management
router.post('/addRoom', roomController.addRoom);            // Add a new room
router.get('/room/:roomNumber', roomController.getRoomDetails);  // Get room details
router.put('/room/:roomNumber', roomController.editRoom);    // Edit room details
router.delete('/room/:roomNumber', roomController.removeRoom);  // Remove a room

module.exports = router;