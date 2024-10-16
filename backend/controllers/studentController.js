const Student = require('../models/student');

// Add a new student
exports.addStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.getStudentCount = async (req, res) => {
    try {
        const count = await Student.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get student count' });
    }
};

//Get a single student by first name or email
exports.getStudentByNameOrEmail = async (req, res) => {
    try {
        const query = {
            $or: [
                { firstname: req.query.name },
                { email: req.query.email }
            ]
        };


        const student = await Student.find(query);
        
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Update a student by name or email
exports.updateStudentByNameOrEmail = async (req, res) => {
    try {
        const query = {
            $or: [
                { firstname: req.query.name },
                { email: req.query.email }
            ]
        };

        const student = await Student.findOne(query);
        
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        
        Object.assign(student, req.body);
        await student.save();
        
        res.json(student);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a student by name or email
exports.deleteStudentByNameOrEmail = async (req, res) => {
    try {
        const query = {
            $or: [
                { firstname: req.query.name },
                { email: req.query.email }
            ]
        };
        console.log(query);

        const student = await Student.findOneAndDelete(query);
        
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getStudentByDetails = async (req, res) => {
    try {
        const { firstname, lastname, phone, email } = req.query;

        
        const query = {};
        if (firstname) {
            query.firstname = firstname;
        }
        if (lastname) {
            query.lastname = lastname;
        }
        if (phone) {
            query.phone = phone;
        }
        if (email) {
            query.email = email;
        }

        const student = await Student.find(query);

        if (!student || student.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



exports.deleteStudentById = async (req, res) => {
    try {
        const studentId = req.query.id;

        if (!studentId) {
            return res.status(400).json({ message: 'Student ID is required' });
        }

        const student = await Student.findByIdAndDelete(studentId);
        
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


