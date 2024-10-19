const Room = require('../models/room');  // Importing the Room model

// Add a new room
exports.addRoom = async (req, res) => {
    try {
        const { roomNumber, roomType, occupancy, pricePerNight, amenities, images, availabilityStatus, bedSize, roomSize, bathroomType, balcony, view, rating, smartFeatures, description } = req.body;

        const room = new Room({
            roomNumber,
            roomType,
            occupancy,
            pricePerNight,
            amenities,
            images,
            availabilityStatus,
            bedSize,
            roomSize,
            bathroomType,
            balcony,
            view,
            rating,
            smartFeatures,
            description
        });

        // Save the new room in the database
        await room.save();

        res.status(201).json({ message: 'Room added successfully', room });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add room', details: err.message });
    }
};


// Get room details by room number
exports.getRoomDetails = async (req, res) => {
    try {
        const { roomNumber } = req.params;

        const room = await Room.findOne({ roomNumber });

        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        res.status(200).json({ room });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch room details', details: err.message });
    }
};


// Edit a room's details
exports.editRoom = async (req, res) => {
    try {
        const { roomNumber } = req.params;  // Room number to identify the room
        const updates = req.body;  // Data to be updated

        const room = await Room.findOneAndUpdate({ roomNumber }, updates, { new: true });

        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        res.status(200).json({ message: 'Room details updated successfully', room });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update room details', details: err.message });
    }
};


// Remove a room by room number
exports.removeRoom = async (req, res) => {
    try {
        const { roomNumber } = req.params;

        const room = await Room.findOneAndDelete({ roomNumber });

        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        res.status(200).json({ message: 'Room removed successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to remove room', details: err.message });
    }
};
