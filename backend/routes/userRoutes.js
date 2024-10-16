// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authuser');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/reset-password/:token', userController.resetPassword);
router.post('/forgot-password', userController.forgotPassword); 
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route.', user: req.user });
});

module.exports = router;
