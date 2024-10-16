const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactcontroller'); // Fix: Change 'contactController' to 'contactcontroller'

router.post('/createcontact', contactController.createContact);
router.get('/getcontact', contactController.getContacts);

module.exports = router;
