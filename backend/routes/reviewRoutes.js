const express = require('express');
const { addReview, getAllReviews, updateReview, deleteReview } = require('../controllers/reviewController');

const router = express.Router();

// Guest-side: Add a review
router.post('/add', addReview);

// Admin-side: Get all reviews
router.get('/all', getAllReviews);

// Admin-side: Update a review
router.put('/update/:id', updateReview);

// Admin-side: Delete a review
router.delete('/delete/:id', deleteReview);

module.exports = router;
