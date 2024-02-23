// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/reviewController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Private route to create a review (requires authentication)
router.post('/', verifyToken, ReviewController.createReview);
router.get('/', verifyToken, ReviewController.getAllReviews);

router.get('/property/:propertyId', verifyToken, ReviewController.getReviewsByPropertyId);

// Private route to get review by ID (requires authentication)
router.get('/:id', verifyToken, ReviewController.getReviewById);

// Private route to update review by ID (requires authentication)
router.put('/:id', verifyToken, ReviewController.updateReview);

// Private route to delete review by ID (requires authentication)
router.delete('/:id', verifyToken, ReviewController.deleteReview);

module.exports = router;
