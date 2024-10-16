const Instructor = require('../models/instructor');

// Add a new instructor
exports.addInstructor = async (req, res) => {
    try {
        const instructor = new Instructor(req.body);
        await instructor.save();
        res.status(201).json(instructor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getInstructorCount = async (req, res) => {
    try {
        const count = await Instructor.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get instructor count' });
    }
};

exports.getInstructorByFirstName = async (req, res) => {
    try {
        const firstName = req.query.firstname;

        if (!firstName) {
            return res.status(400).json({ message: 'First name parameter is required for searching' });
        }

        const instructor = await Instructor.findOne({ firstname: firstName });

        if (!instructor) {
            return res.status(404).json({ message: 'Instructor not found' });
        }

        res.json(instructor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Get a single instructor by first name or email
exports.getInstructorByNameOrEmail = async (req, res) => {
    try {
        const query = {
            $or: [
                { firstname: req.query.name },
                { email: req.query.email }
            ]
        };

        const instructor = await Instructor.find(query);

        if (!instructor || instructor.length === 0) {
            return res.status(404).json({ message: 'Instructor not found' });
        }

        res.json(instructor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update an instructor by name or email
exports.updateInstructorByNameOrEmail = async (req, res) => {
    try {
        const query = {
            $or: [
                { firstname: req.query.name },
                { email: req.query.email }
            ]
        };

        const instructor = await Instructor.findOne(query);

        if (!instructor) {
            return res.status(404).json({ message: 'Instructor not found' });
        }

        Object.assign(instructor, req.body);
        await instructor.save();

        res.json(instructor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// // Delete an instructor by name or email
// exports.deleteInstructorByNameOrEmail = async (req, res) => {
//     try {
//         const query = {
//             $or: [
//                 { firstname: req.query.name },
//                 { email: req.query.email }
//             ]
//         };

//         const instructor = await Instructor.findOneAndDelete(query);

//         if (!instructor) {
//             return res.status(404).json({ message: 'Instructor not found' });
//         }

//         res.json({ message: 'Instructor deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };
exports.deleteInstructorById = async (req, res) => {
    try {
        const instructorId = req.query.id;

        // Check if the ID is valid
        if (!instructorId) {
            return res.status(400).json({ message: 'ID parameter is required for deleting' });
        }

        const instructor = await Instructor.findByIdAndDelete(instructorId);

        if (!instructor) {
            return res.status(404).json({ message: 'Instructor not found' });
        }

        res.json({ message: 'Instructor deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllInstructors = async (req, res) => {
    try {
        const instructors = await Instructor.find();

        if (!instructors || instructors.length === 0) {
            return res.status(404).json({ message: 'No instructors found' });
        }

        res.json(instructors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

