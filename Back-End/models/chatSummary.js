const mongoose = require('mongoose');

const chatSummarySchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  lastMessage: String,
  lastMessageTime: Date,
  chatId: String // Reference to the Firestore document ID
});

module.exports = mongoose.model('ChatSummary', chatSummarySchema);
