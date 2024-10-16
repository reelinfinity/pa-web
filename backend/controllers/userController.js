const jwt = require('jsonwebtoken');
const { sendResetEmail } = require('../utils/emailUtils');
const Admin = require('../models/admin');
const Student = require('../models/student');
const Instructor = require('../models/instructor');

function generateToken(user) {
    return jwt.sign({ id: user._id, email: user.email, role: user.role, firstname: user.firstname, lastname: user.lastname, phone: user.phone, email: user.email }, '12345', { expiresIn: '1440h' });
}

async function register(req, res) {
    try {
        const { firstname, lastname, phone, email, password, role, status } = req.body;

        let user;

        // Check the role
        if (role === 'student') {
            // Create a new student instance
            user = new Student({ firstname, lastname, phone, email, password, role, status });
        } else if (role === 'instructor') {
            // Create a new instructor instance
            user = new Instructor({ firstname, lastname, phone, email, password, role, status });
        } else {
            // Create a new admin instance
            user = new Admin({ firstname, lastname, phone, email, password, role, status });
        }

        // Save the user instance
        await user.save();

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Registration failed' });
    }
}

async function login(req, res) {
    try {
        const { email, password, role } = req.body;

        let user;

        // Check the role
        if (role === 'student') {
            user = await Student.findOne({ email });
        } else if (role === 'instructor') {
            user = await Instructor.findOne({ email });
        } else {
            user = await Admin.findOne({ email });
        }

        if (!user) {
            return res.status(401).json({ error: 'invalid username or password' });
        }

        if (user.password !== password) {
            return res.status(401).json({ error: 'incorrect password' });
        }

        if (user.role !== role) {
            return res.status(401).json({ error: 'please select the correct role' });
        }

        const token = generateToken(user);

        res.status(200).json({ message: 'login successful', token, role: user.role , firstname: user.firstname, lastname: user.lastname, phone: user.phone, email: user.email});
    } catch (error) {
        res.status(500).json({ error: 'login failed' });
    }
}

async function resetPassword(req, res) {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const decoded = jwt.verify(token, '12345');

        let user;

        // Check the role
        if (decoded.role === 'student') {
            user = await Student.findById(decoded.id);
        } else if (decoded.role === 'instructor') {
            user = await Instructor.findById(decoded.id);
        } else {
            user = await Admin.findById(decoded.id);
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ error: 'Reset password failed' });
    }
}

async function forgotPassword(req, res) {
    try {
        const { email } = req.body;

        let user;

        // Find the user based on email
        user = await Student.findOne({ email });
        if (!user) {
            user = await Instructor.findOne({ email });
            if (!user) {
                user = await Admin.findOne({ email });
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
            }
        }

        const token = jwt.sign({ id: user._id, role: user.role }, '12345', { expiresIn: '1h' });

        await sendResetEmail(user, token);

        res.status(200).json({ message: 'Reset email sent successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Forgot password failed' });
    }
}


module.exports = { register, login, resetPassword, forgotPassword };
