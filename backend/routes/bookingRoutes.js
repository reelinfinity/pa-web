const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/bookRoom', bookingController.bookRoom);
router.post('/cancelBooking', bookingController.cancelBooking);

module.exports = router;
