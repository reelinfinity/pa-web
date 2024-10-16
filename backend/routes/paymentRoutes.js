const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route to initiate PayPal payment
router.get('/paypal/initiate', paymentController.initiatePayPalPayment);

// Route to handle PayPal payment execution callback
router.get('/paypal/execute', paymentController.executePayPalPayment);

module.exports = router;
