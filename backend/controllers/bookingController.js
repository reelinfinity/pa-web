const Room = require('../models/room');
const Booking = require('../models/Booking');

exports.bookRoom = async (req, res) => {
    try {
        const { roomId, userId, checkInDate, checkOutDate } = req.body;

        // Find the room by ID
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        // Check if the room is available during the selected dates
        const existingBookings = await Booking.find({
            room: roomId,
            $or: [
                { checkInDate: { $lte: checkOutDate }, checkOutDate: { $gte: checkInDate } }
            ]
        });

        if (existingBookings.length > 0) {
            return res.status(400).json({ error: 'Room is not available for the selected dates' });
        }

        // Calculate the total price
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)); // Calculate the number of nights
        const totalPrice = nights * room.pricePerNight;

        // Create a new booking
        const booking = new Booking({
            room: roomId,
            user: userId,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            totalPrice: totalPrice,
            status: 'Confirmed'
        });

        await booking.save();

        res.status(201).json({ message: 'Room booked successfully', booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to book room' });
    }
};



exports.cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.body;

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        booking.status = 'Cancelled';
        await booking.save();

        res.status(200).json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to cancel booking' });
    }
};
