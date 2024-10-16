const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

router.post('/addmeeting', meetingController.addMeeting);
router.get('/getMeeting', meetingController.getMeeting);
router.put('/updatemeeting', meetingController.updateMeeting);
router.delete('/deleteMeeting', meetingController.deleteMeeting);
router.get('/getRecentMeetingLinkByCourse', meetingController.getRecentMeetingLinkByCourse);

module.exports = router;