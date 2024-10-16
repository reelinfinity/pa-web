const Material = require('../models/material');
const nodemailer = require('nodemailer');
const Course = require('../models/course');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'malalipramod333@gmail.com',
        pass: 'swqb gdxc mzvy elgg'
    }
});



const addMaterial = async (req, res) => {
    try {
        const { course, topic, materialLink } = req.body;

        if (!course || !topic || !materialLink) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const foundCourse = await Course.findOne({ title: course });

        if (!foundCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }

        const newMaterial = new Material({ course: foundCourse._id, topic, materialLink });
        await newMaterial.save();

        const mailOptions = {
            from: 'malalipramod333@gmail.com',
            to: 'malalipramod33@gmail.com',
            subject: `New Course Material Added for ${foundCourse.title}`,
            text: `Dear User,\n\nA new course material has been added for the course "${foundCourse.title}".\n\nTopic: ${topic}\nMaterial Link: ${materialLink}\n\nRegards,\nLMS`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.status(201).json({ message: 'Material added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add material' });
    }
};

const getMaterial = async (req, res) => {
    try {
        const materials = await Material.find();

        if (!materials || materials.length === 0) {
            return res.status(404).json({ error: 'No materials found' });
        }

        res.status(200).json(materials);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch materials' });
    }
};

const updateMaterial = async (req, res) => {
    try {
        // Implement update logic here
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update material' });
    }
};

const deleteMaterial = async (req, res) => {
    try {
        // Implement delete logic here
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete material' });
    }
};

const getMaterialByCourse = async (req, res) => {
    try {
        const { course } = req.params; // Extract the course name from the request parameters

        const materials = await Material.find({ course }); // Find materials with the specified course name

        if (!materials || materials.length === 0) {
            // If no materials are found for the course, return a 404 error
            return res.status(404).json({ error: 'No materials found for the specified course' });
        }

        // If materials are found, return them in the response
        res.status(200).json(materials);
    } catch (error) {
        // If an error occurs during the process, return a 500 error
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch materials by course' });
    }
};


module.exports = {
    addMaterial,
    getMaterial,
    updateMaterial,
    deleteMaterial,
    getMaterialByCourse
};
