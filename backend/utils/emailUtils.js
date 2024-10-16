const nodemailer = require('nodemailer');

async function sendResetEmail(user, token) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: user.email,
        subject: 'Password Reset Request',
        text: `Click this link to reset your password: http://localhost:2024/reset-password/${token}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully.");
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Forgot password email failed");
    }
}

module.exports = { sendResetEmail };
