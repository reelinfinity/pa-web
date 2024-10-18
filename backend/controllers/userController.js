const jwt = require('jsonwebtoken');
const { sendResetEmail } = require('../utils/emailUtils');
const Admin = require('../models/admin');
const Student = require('../models/student');
const Instructor = require('../models/instructor');
const User= require('../models/user');



async function register(req, res) {
    try {
        const {phone,email, password, role, status } = req.body;

        let user;

        user = new User({ phone,email, password, role, status  });


        // Save the user instance
        await user.save();

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Registration failed' });
    }
}

const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email,}, process.env.JWT_SECRET, {
        expiresIn: '1h' // Token expires in 1 hour
    });
};

async function login(req, res) {
    try {
        const { emailOrPhone, password } = req.body;

        // Find the user by either email or phone number
        const user = await User.findOne({
            $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
        });

        // Check if user exists
        if (!user) {
            return res.status(401).json({ error: 'Invalid email/phone or password' });
        }

        // Check if the password matches (since we're not using hashing)
        if (user.password !== password) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        // Generate a JWT token (assuming generateToken is a helper function that creates a JWT token)
        const token = generateToken(user);

        // Return success response with the token and user info
        res.status(200).json({
            message: 'Login successful',
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed' });
    }
};

async function resetPassword (req, res) {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        // Verify the reset token
        const decoded = jwt.verify(token, '12345678'); // Replace '12345' with your JWT secret key

        // Find the user by decoded ID from token
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user's password
        user.password = newPassword;

        // Save the updated user
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Password reset failed' });
    }
};


async function forgotPassword (req, res) {
    try {
        const { email } = req.body;

        // Find the user based on email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate reset token with JWT, signing with the user's ID and role
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the password reset email
        await sendResetEmail(user, token);

        res.status(200).json({ message: 'Reset email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Forgot password failed' });
    }
};

module.exports = { register, login, resetPassword, forgotPassword };
