const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Public route to create a user

router.post('/', UserController.createUser);

// Public route to log in a user
router.post('/login', UserController.loginUser);

router.get('/all', UserController.getAllUsers);

// Private route to get user by ID (requires authentication)
router.get('/:id', verifyToken, UserController.getUserById);

// Private route to update user by ID (requires authentication)
router.put('/:id', verifyToken, UserController.updateUser);

// Private route to delete user by ID (requires authentication)
router.delete('/:id', verifyToken, UserController.deleteUser);


module.exports = router;
