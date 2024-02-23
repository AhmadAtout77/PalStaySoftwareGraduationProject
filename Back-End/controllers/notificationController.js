const admin = require('../config/firebaseAdmin'); // Ensure this is the correct path to your firebaseAdmin.js
const User = require('../models/user');

// Function to send a push notification
const fetch = require('node-fetch');

const sendPushNotification = async (req, res) => {
    if (!fetch) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait for fetch to be imported
      }
  const { token, title, body } = req.body;
  const expoPushEndpoint = 'https://exp.host/--/api/v2/push/send';

  try {
    const response = await fetch(expoPushEndpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: token,
        title:title,
        sound: "default",
        body: body,
      }),
    });

    const data = await response.json();
    res.status(200).json({ message: 'Notification sent successfully', data });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
};


// Function to save user's FCM token
const saveUserToken = async (req, res) => {
  const { userId } = req.params;
  const { fcmToken } = req.body;
  console.log("token at save ",fcmToken);
  // Here, you would update the user's document to include the FCM token
  // The actual implementation depends on your database schema
  // Example for MongoDB:
  try {
    const user = await User.findById(userId);
    user.fcmToken = fcmToken;
    await user.save();
    res.status(200).json({ message: 'Token saved successfully' });
  } catch (error) {
    console.error('Error saving token:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  sendPushNotification,
  saveUserToken,
};
