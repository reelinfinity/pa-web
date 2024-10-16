const Course = require('../models/course');
const { ObjectId } = require('mongoose').Types;

const addCourse = async (req, res) => {
    try {
        const { title, description, instructor, duration, category, price, imageUrl, level, prerequisites, lessons } = req.body;

        const course = new Course({ title, description, instructor, duration, category, price, imageUrl, level, prerequisites, lessons });

        await course.save();
  
        res.status(201).json({ message: 'Course added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add course' });
    }
};

const getCourseCount = async (req, res) => {
    try {
        const count = await Course.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get course count' });
    }
};


const getCoursesByInstructor = async (req, res) => {
    try {
        const instructor = req.query.instructor;

        let courses;
        if (instructor) {
            courses = await Course.find({ instructor: { $regex: instructor, $options: 'i' } }); // Case-insensitive search
        } else {
            courses = await Course.find();
        }

        if (!courses || courses.length === 0) {
            return res.status(404).json({ error: 'Courses not found' });
        }

        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
};

const getCoursesByCategory = async (req, res) => {
    try {
        const category = req.query.category;

        let courses;
        if (category) {
            courses = await Course.find({ category: { $regex: category, $options: 'i' } }); // Case-insensitive search
        } else {
            courses = await Course.find();
        }

        if (!courses || courses.length === 0) {
            return res.status(404).json({ error: 'Courses not found' });
        }

        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
};

const getCoursesByLevel = async (req, res) => {
    try {
        const level = req.query.level; // Corrected variable name

        let courses;
        if (level) { // Check for level instead of category
            courses = await Course.find({ level: { $regex: level, $options: 'i' } }); // Case-insensitive search
        } else {
            courses = await Course.find();
        }

        if (!courses || courses.length === 0) {
            return res.status(404).json({ error: 'Courses not found' });
        }

        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
};




const getCourses = async (req, res) => {
    try {
        const query = req.query.q;

        let courses;
        if (query) {
            courses = await Course.find({ title: { $regex: query, $options: 'i' } }); // Case-insensitive search
        } else {
            courses = await Course.find();
        }

        if (!courses || courses.length === 0) {
            return res.status(404).json({ error: 'Courses not found' });
        }

        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
};

const updateCourses = async (req, res) => {
    try {
        const updates = req.body.updates;
        const titles = req.body.titles;

        const courses = await Course.find({ title: { $in: titles } });

        if (!courses || courses.length === 0) {
            return res.status(404).json({ error: 'Courses not found' });
        }

        const courseIds = courses.map(course => course._id);

        const result = await Course.updateMany({ _id: { $in: courseIds } }, { $set: updates });

        res.status(200).json({ message: `${result.nModified} courses updated successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update courses' });
    }
};

const deleteCoursesById = async (req, res) => {
    try {
        const { courseIds } = req.query;


        if (!courseIds) {
            return res.status(400).json({ error: 'No course IDs provided' });
        }

        const courseIdArray = courseIds.split(',');

        for (const courseId of courseIdArray) {
            if (!ObjectId.isValid(courseId)) {
                return res.status(400).json({ error: `Invalid course ID: ${courseId}` });
            }
        }

        const deletePromises = courseIdArray.map(courseId => Course.deleteOne({ _id: courseId }));
        const results = await Promise.all(deletePromises);

        // Check if any courses were deleted successfully
        const successfulDeletes = results.filter(result => result.deletedCount === 1);

        if (successfulDeletes.length === courseIdArray.length) {
            return res.status(200).json({ message: 'All courses deleted successfully' });
        } else {
            return res.status(500).json({ error: 'Some courses failed to delete' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete courses' });
    }
};

const searchCourseByTitle = async (req, res) => {
    try {
        const query = req.query.search;

        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required for searching' });
        }

        const courses = await Course.find({ title: { $regex: query, $options: 'i' } });

        if (!courses || courses.length === 0) {
            return res.status(404).json({ error: 'Courses not found' });
        }

        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to search for the courses' });
    }
};
const getCoursesSortedByRating = async (req, res) => {
    try {
        const courses = await Course.find().sort({ rating: -1 }).limit(6);

        if (!courses || courses.length === 0) {
            return res.status(404).json({ error: 'Courses not found' });
        }

        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
};



module.exports = {
    addCourse,
    getCourses,
    updateCourses,
    deleteCoursesById,
    searchCourseByTitle,
    getCoursesSortedByRating,
    getCourseCount,
    getCoursesByInstructor,
    getCoursesByCategory,
    getCoursesByLevel

};
