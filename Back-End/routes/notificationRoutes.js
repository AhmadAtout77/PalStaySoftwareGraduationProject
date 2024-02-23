const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const notificationController = require('../controllers/notificationController');

// Route to send a push notification
router.post('/send-notification', verifyToken, notificationController.sendPushNotification);

// Route to save a user's FCM token
router.post('/save-token/:userId', verifyToken, notificationController.saveUserToken);

module.exports = router;
