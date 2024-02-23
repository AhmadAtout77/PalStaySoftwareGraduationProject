// routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const PropertyController = require('../controllers/propertyController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Private route to create a property (requires authentication)
router.post('/', verifyToken, PropertyController.createProperty);
// Add this route to your propertyRoutes.js file

// Route to get all valid properties
router.get('/', verifyToken, PropertyController.getAllProperties);

// Add these lines to propertyRoutes.js
router.put('/confirm/:id', verifyToken, PropertyController.confirmProperty);
router.get('/invalid-posts', verifyToken, PropertyController.getInvalidProperties);

router.get('/search', verifyToken, PropertyController.searchProperties);
router.get('/offer', verifyToken, PropertyController.getOfferProperty);

// Private route to get property by ID (requires authentication)
router.get('/:id', verifyToken, PropertyController.getPropertyById);

// Private route to update property by ID (requires authentication)
router.put('/:id', verifyToken, PropertyController.updateProperty);

// Private route to delete property by ID (requires authentication)
router.delete('/:id', verifyToken, PropertyController.deleteProperty);

router.get('/user/:id', verifyToken, PropertyController.getUserProperties);

module.exports = router;
