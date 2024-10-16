// meetingController.js
const Meeting = require('../models/meeting');
const Course = require('../models/course');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'malalipramod333@gmail.com',
        pass: 'swqb gdxc mzvy elgg'
    }
});

const addMeeting = async (req, res) => {
    try {
        const { title, organizer, link, date, start_time, end_time, course: courseTitle } = req.body;
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

        if (!dateRegex.test(date)) {
            return res.status(400).json({ error: 'Invalid date format. Date should be in the format of DD/MM/YYYY.' });
        }

        const foundCourse = await Course.findOne({ title: courseTitle });
        if (!foundCourse) {
          
            return res.status(400).json({ error: 'Course does not exist' });
        }

        const meeting = new Meeting({ title, organizer, link, date, start_time, end_time, course: foundCourse._id });

        await meeting.save();

        const mailOptions = {
            from: 'malalipramod333@gmail.com',
            to: 'malalipramod33@gmail.com',
            subject: `New Meeting Added for ${foundCourse.title}`,
            text: `Dear User,\n\nA new meeting has been added for the course "${foundCourse.title}".\n\nTitle: ${title}\nOrganizer: ${organizer}\nDate: ${date}\nStart Time: ${start_time}\nEnd Time: ${end_time}\nMeeting Link: ${link}\n\nRegards,\nLMS`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.status(201).json({ message: 'Meeting added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add meeting' });
    }
};


const getMeeting = async (req, res) => {
    try {
        const course = req.query.course;

        let meetings;
        if (course) {
            meetings = await Meeting.find({ course: course }).sort({ _id: -1 });
        } else {
            meetings = await Meeting.find().sort({ _id: -1 });
        }

        if (!meetings || meetings.length === 0) {
            return res.status(404).json({ error: 'Meetings not found' });
        }

        res.status(200).json(meetings.map(meeting => ({
            title: meeting.title,
            course: meeting.course,
            organizer: meeting.organizer,
            link: meeting.link,
            date: meeting.date,
            startTime: meeting.start_time,
            endTime: meeting.end_time
        })));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch meetings' });
    }
};


const updateMeeting = async (req, res) => {
    try {
        const { titles, updates } = req.body;

        const result = await Meeting.updateMany({ title: { $in: titles } }, { $set: updates });

        res.status(200).json({ message: `${result.nModified} meetings updated successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update meetings' });
    }
};

const deleteMeeting = async (req, res) => {
    try {
        const titles = req.body.titles;

        const meetings = await Meeting.find({ title: { $in: titles } });

        if (!meetings || meetings.length === 0) {
            return res.status(404).json({ error: 'Meetings not found' });
        }

        const meetingIds = meetings.map(meeting => meeting._id);

        const result = await Meeting.deleteMany({ _id: { $in: meetingIds } });

        res.status(200).json({ message: `${result.deletedCount} meetings deleted successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete meetings' });
    }
};


const getRecentMeetingLinkByCourse = async (req, res) => {
    try {
        const { course } = req.query;

        if (!course) {
            return res.status(400).json({ 
            error: 'Course title is required' });
        }

        const recentMeeting = await Meeting.findOne({ course }).sort({ date: -1 });

        if (!recentMeeting) {
            return res.status(404).json({ error: 'Meeting not found for the specified course' });
        }

        res.status(200).json({ link: recentMeeting.link });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch link' });
    }
};


module.exports = {
    addMeeting,
    getMeeting,
    updateMeeting,
    deleteMeeting,
    getRecentMeetingLinkByCourse
};
