const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://anythingwithabhishek:myonBMrKqp6SFLya@cluster0.eo7bbib.mongodb.net/lms-db?retryWrites=true&w=majority&appName=Cluster0',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error.message);
    }
};

module.exports = connectDB;
