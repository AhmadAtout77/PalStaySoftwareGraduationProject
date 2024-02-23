const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const chatController = require('../controllers/chatController');

router.post('/send', verifyToken, chatController.sendMessage);
router.get('/messages/:chatId', verifyToken, chatController.getMessages);
router.get('/user-chats/:userId', verifyToken, chatController.listUserChats); // Route to get chat list for a user
router.post('/create', verifyToken, chatController.createChat);
router.delete('/:chatId', verifyToken, chatController.deleteChat);

module.exports = router;
