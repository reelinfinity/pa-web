const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/addAdmin', adminController.createAdmin);
router.get('/getAllAdmins', adminController.getAllAdmins);
router.get('/getAdminByName', adminController.getAdminByName);
router.put('/updateAdminByName/', adminController.updateAdminByName);
router.delete('/deleteAdminByName', adminController.deleteAdminByName);

module.exports = router;

