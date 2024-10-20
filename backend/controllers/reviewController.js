const Review = require('../models/review');

async function addReview(req, res) {
    try {
        const { guestName, roomNumber, rating, feedback } = req.body;

        // Validate the input
        if (!guestName || !roomNumber || !rating || !feedback) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create and save the new review
        const newReview = new Review({
            guestName,
            roomNumber,
            rating,
            feedback
        });

        await newReview.save();

        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add review' });
    }
}


async function getAllReviews(req, res) {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });

        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
}

async function updateReview(req, res) {
    try {
        const { id } = req.params;
        const { rating, feedback } = req.body;

        // Find and update the review
        const updatedReview = await Review.findByIdAndUpdate(id, { rating, feedback }, { new: true });

        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json({ message: 'Review updated successfully', updatedReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update review' });
    }
}



async function deleteReview(req, res) {
    try {
        const { id } = req.params;

        // Find and delete the review
        const deletedReview = await Review.findByIdAndDelete(id);

        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete review' });
    }
}






module.exports = { addReview,getAllReviews,updateReview,deleteReview };
