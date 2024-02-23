// routes/wishlistRoutes.js
const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/wishlistController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Private route to add to wishlist (requires authentication)
router.post('/', verifyToken, WishlistController.addToWishlist);

// Private route to remove from wishlist (requires authentication)
router.delete('/:id', verifyToken, WishlistController.removeFromWishlist);

// Private route to get user wishlist (requires authentication)
router.get('/user/:userId', verifyToken, WishlistController.getUserWishlist);

module.exports = router;
