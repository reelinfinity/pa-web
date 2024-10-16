// materialRoutes.js

const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');

router.post('/addmaterial', materialController.addMaterial);
router.get('/getmaterial', materialController.getMaterial);
router.put('/updatematerial', materialController.updateMaterial);
router.delete('/deletematerial', materialController.deleteMaterial);
router.get('/getmaterial/:course', materialController.getMaterialByCourse);

module.exports = router;
