const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true,
        unique: true,
    },
    roomType: {
        type: String,
        enum: ['Single', 'Double', 'Suite', 'Luxury', 'Penthouse'],
        required: true
    },
    occupancy: {
        adults: {
            type: Number,
            required: true
        },
        children: {
            type: Number,
            default: 0
        }
    },
    pricePerNight: {
        type: Number,
        required: true
    },
    amenities: [{
        type: String,
        enum: ['Free Wi-Fi', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Television', 'Private Balcony', 'Safe Deposit Box', 'Coffee Maker', 'Hair Dryer', 'Jacuzzi', 'Soundproofing', 'Smart TV', 'Heated Floors', 'Luxury Toiletries'],
    }],
    images: [{
        type: String,
        required: true
    }],
    availabilityStatus: {
        type: String,
        enum: ['Available', 'Booked', 'Maintenance'],
        required: true
    },
    bedSize: {
        type: String,
        enum: ['Single', 'Double', 'Queen', 'King'],
        required: true
    },
    roomSize: {
        type: Number, // Room size in square feet
        required: true
    },
    bathroomType: {
        type: String,
        enum: ['Shared', 'Private', 'En-suite', 'Luxury Spa'],
        required: true
    },
    balcony: {
        type: Boolean,
        default: false
    },
    view: {
        type: String,
        enum: ['City View', 'Sea View', 'Garden View', 'Mountain View', 'Pool View'],
        default: 'City View'
    },
    rating: {
        cleanliness: {
            type: Number,
            min: 0,
            max: 5,
            default: 5
        },
        comfort: {
            type: Number,
            min: 0,
            max: 5,
            default: 5
        },
        facilities: {
            type: Number,
            min: 0,
            max: 5,
            default: 5
        }
    },
    smartFeatures: {
        voiceControl: {
            type: Boolean,
            default: false
        },
        smartLighting: {
            type: Boolean,
            default: false
        },
        keylessEntry: {
            type: Boolean,
            default: false
        },
        climateControl: {
            type: Boolean,
            default: false
        }
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Room', RoomSchema);
