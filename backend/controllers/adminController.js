const Admin = require('../models/admin');

// Create a new admin
const createAdmin = async (req, res) => {
    try {
        const admin = new Admin(req.body);
        await admin.save();
        res.status(201).json(admin);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all admins
const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json({ admins });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get admin by ID
const getAdminByName = async (req, res) => {
    try {
        const adminName = req.query.name;
        const admin = await Admin.findOne({ firstname: adminName });
        if (!admin) {
            throw new Error('Admin not found');
        }
        res.status(200).json({ admin });
    } catch (error) {
        res.status(404).json({ error: `Failed to find admin: ${error.message}` });
    }
};

// Update admin by ID
const updateAdminByName = async (req, res) => {
    try {
        // Constructing the query to find the admin by name
        const query = { firstname: req.query.name };

        // Finding the admin based on the query
        const admin = await Admin.findOne(query);

        // If admin not found, return 404 error
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Updating the admin with the request body
        Object.assign(admin, req.body);

        // Saving the updated admin
        await admin.save();

        // Sending the updated admin in the response
        res.json(admin);
    } catch (err) {
        // Handling any errors
        res.status(400).json({ message: err.message });
    }
};

// Delete admin by ID
const deleteAdminByName = async (req, res) => {
    try {
        const adminName = req.query.name;
        const admin = await Admin.findOneAndDelete({ firstname: adminName });
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        console.log('Deleted successfully');
        res.status(204).send();
    } catch (error) {
        // Handle MongoDB-related errors separately
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        // Handle other unexpected errors
        res.status(500).json({ error: 'Failed to delete admin', details: error.message });
    }
};


module.exports = {
    createAdmin,
    getAllAdmins,
    getAdminByName,
    updateAdminByName,
    deleteAdminByName
};
