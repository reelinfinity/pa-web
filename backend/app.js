const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/dbConnection');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const studentRoutes=require('./routes/studentRoutes');
const instructorRoutes=require('./routes/instructorRoutes');
const meetingRoutes =require('./routes/meetingRoutes');
const materialRoutes =require('./routes/materialRoutes');
const EnrollmentRoute=require('./routes/EnrollmentRoute');
const contactRoutes =require('./routes/contactRoutes');
const paymentRoute=require('./routes/paymentRoutes');
const adminRoute =require('./routes/adminRoutes');
const roomRoutes=require('./routes/roomRoutes');
const bookingRoutes=require('./routes/bookingRoutes');
const reviewRoutes=require('./routes/reviewRoutes');


require('dotenv').config();

const app = express();

app.use(express.json());

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  


app.use('/users', userRoutes);
app.use('/rooms', roomRoutes);
app.use('/bookings', bookingRoutes);
app.use('/review',reviewRoutes);

app.use('/courses', courseRoutes);
app.use('/student', studentRoutes);
app.use('/instructor',instructorRoutes);

app.use('/meeting',meetingRoutes);
app.use('/materials',materialRoutes);

app.use('/Enrollment',EnrollmentRoute);
app.use('/contacts',contactRoutes);
app.use('/payment',paymentRoute);
app.use('/admin',adminRoute);




connectDB();

module.exports = app;
