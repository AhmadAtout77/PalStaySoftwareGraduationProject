// controllers/wishlistController.js
const Wishlist = require('../models/wishlist');

const addToWishlist = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const newWishlistItem = new Wishlist(req.body);
        await newWishlistItem.save();
        res.status(201).json(newWishlistItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeFromWishlist = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        await Wishlist.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserWishlist = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const userWishlist = await Wishlist.find({ user: req.params.userId }).populate('user').populate('propertyId');
        res.status(200).json(userWishlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addToWishlist,
    removeFromWishlist,
    getUserWishlist,
};
