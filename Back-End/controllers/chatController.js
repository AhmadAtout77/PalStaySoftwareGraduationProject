const admin = require('../config/firebaseAdmin');
const ChatSummary = require('../models/chatSummary');
const db = admin.firestore();

const sendMessage = async (req, res) => {
  const { chatId, sender, receiver, message } = req.body; // Extract from request body

  const messageData = {
    sender: sender,
    receiver: receiver,
    message: message,
    timestamp: admin.firestore.FieldValue.serverTimestamp() // Uses the server's timestamp
  };

  try {
    // Add a new message to the "messages" subcollection of the chat document
    const messageRef = await db.collection('chats').doc(chatId).collection('messages').add(messageData);
    console.log(`New message added with ID: ${messageRef.id}`);

    // Update the last message and timestamp in the chat document
    await db.collection('chats').doc(chatId).update({
      lastMessage: message,
      lastMessageTime: admin.firestore.FieldValue.serverTimestamp()
    });

    // Update the last message and timestamp in MongoDB ChatSummary
    await ChatSummary.findOneAndUpdate({ chatId: chatId }, {
      lastMessage: message,
      lastMessageTime: new Date() // Use the current date-time or the timestamp from the message if available
    });

    // Send a response back to the client
    res.status(201).json({ messageId: messageRef.id, message: messageData });
  } catch (error) {
    console.error("Error sending message: ", error);
    res.status(500).json({ error: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params; // chatId from the URL parameter

    // Retrieve messages from the "messages" subcollection of the chat document
    // and order them by the 'timestamp' field
    const messages = await db.collection('chats').doc(chatId)
      .collection('messages')
      .orderBy('timestamp', 'asc') // Use'timestamp' 
      .get();

    // Map over the documents and format the response
    const formattedMessages = messages.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Send the formatted messages as a response
    res.json(formattedMessages);
  } catch (error) {
    console.error("Error retrieving messages: ", error);
    res.status(500).json({ error: error.message });
  }
};
const listUserChats = async (req, res) => {
  try {
    const { userId } = req.params;

    const chats = await ChatSummary.find({ participants: userId })
      .populate('participants', 'username') // Assuming 'username' is in User model
      .sort({ lastMessageTime: -1 });

    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createChat = async (req, res) => {
  try {
    const { participants } = req.body; // Array of user IDs

    // Create a new chat document in Firestore
    const chatRef = db.collection('chats').doc();
    await chatRef.set({ participants, lastMessage: '', lastMessageTime: null });
    var datetime = new Date();

    // Create a new chat summary in MongoDB
    const newChatSummary = new ChatSummary({
      participants,
      chatId: chatRef.id, // Store Firestore chat document ID
      lastMessage: 'Hello Developer',
      lastMessageTime: datetime
    });
    await newChatSummary.save();

    res.status(201).json({ chatId: chatRef.id, summary: newChatSummary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;

    // Delete chat from MongoDB
    await ChatSummary.findOneAndDelete({ chatId: chatId });

    // Respond with success message
    res.status(200).json({ message: 'Chat deleted successfully from MongoDB' });
  } catch (error) {
    console.error('Error deleting chat:', error);
    res.status(500).json({ error: error.message });
  }
};
module.exports = { sendMessage, getMessages, listUserChats, createChat ,deleteChat};
