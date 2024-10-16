const { error } = require('console');
const Enrollment = require('../models/Enrollment');
const Student = require('../models/student');
const Course = require('../models/course');

exports.enrollStudents = async (req, res) => {
    try {

        if (req.user !== 'student') {
            return res.status(403).json({ error: 'Access denied. Only students are allowed.' });
        }
        const { studentIds, courseIds } = req.body;


        if (!studentIds || !courseIds) {
            return res.status(400).json({ error: 'Both studentIds and courseIds are required' });
        }

        const enrollments = [];
        for (const studentId of studentIds) {
            for (const courseId of courseIds) {
                const enrollment = new Enrollment({ studentId, courseId });
                await enrollment.save();
                enrollments.push(enrollment);
            }
        }

        res.status(201).json({ message: 'Students enrolled successfully', enrollments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to enroll students' });
    }
};


// Controller function to enroll a logged-in student in courses
exports.enrollStudentInCourses = async (req, res) => {
    try {
        const studentId = req.user.id; // Assuming studentId is stored in the decoded JWT payload

        const { courseIds } = req.body;

        // Check if courseIds are provided
        if (!courseIds || !Array.isArray(courseIds) || courseIds.length === 0) {
            return res.status(400).json({ error: 'Course IDs are required' });
        }

        // Array to store newly created enrollments
        const enrollments = [];

        // Iterate through each course ID
        for (const courseId of courseIds) {
            // Check if the student is already enrolled in the course
            const existingEnrollment = await Enrollment.findOne({ studentId, courseId });

            // If enrollment already exists, skip to the next course
            if (existingEnrollment) {
                console.log(`Student ${studentId} is already enrolled in course ${courseId}`);
                enrollments.push({ courseId, message: 'Already enrolled in this course' });
                continue;
            }

            // Create a new enrollment for the course
            const enrollment = new Enrollment({ studentId, courseId });
            await enrollment.save();
            enrollments.push({ courseId, message: 'Enrolled successfully' });
        }

        res.status(201).json({ message: 'Enrollment process completed', enrollments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to enroll student in courses' });
    }
};



// Controller function to get enrolled students in a particular course and count
exports.getEnrolledStudentsInCourse = async (req, res) => {
    try {
        const { courseId } = req.params;// Assuming courseId is provided in the route parameters

        // Find all enrollments for the specified course ID
        const enrollments = await Enrollment.find({ courseId });


        // If no enrollments are found, return a message
        if (!enrollments || enrollments.length === 0) {
            return res.status(404).json({ message: 'No students enrolled in this course' });
        }

        // Array to store student names
        const enrolledStudents = [];

        // Iterate through each enrollment
        for (const enrollment of enrollments) {
            // Find student details using studentId
            const student = await Student.findById(enrollment.studentId);

            // If student is found, add their name to the array
            if (student) {
                enrolledStudents.push(student.firstname + ' ' + student.lastname);
            }
        }

        // Count of enrolled students
        const enrolledCount = enrolledStudents.length;

        res.status(200).json({ enrolledStudents, enrolledCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch enrolled students in the course' });
    }
};



exports.getEnrolledCoursesByStudent = async (req, res) => {
    try {
        const { studentId } = req.body; // Assuming studentId is provided in the route parameters

        // Find all enrollments for the specified student ID
        const enrollments = await Enrollment.find({ studentId });

        // If no enrollments are found, return a message
        if (!enrollments || enrollments.length === 0) {
            return res.status(404).json({ message: 'Student is not enrolled in any course' });
        }

        // Array to store enrolled course details
        const enrolledCourses = [];

        // Iterate through each enrollment
        for (const enrollment of enrollments) {
            // Find course details using courseId
            const course = await Course.findById(enrollment.courseId);

            // If course is found, add its details to the array
            if (course) {
                enrolledCourses.push({
                    courseId: course._id,
                    courseName: course.title
                });
            }
        }

        // Count of enrolled courses
        const enrolledCount = enrolledCourses.length;

        res.status(200).json({ enrolledCourses, enrolledCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch enrolled courses for the student' });
    }
};



