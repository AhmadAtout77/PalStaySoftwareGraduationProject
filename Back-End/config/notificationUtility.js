const admin = require('./firebaseAdmin'); // replace with the path to your firebaseAdmin.js

const sendPushNotification = async (token, title, body) => {
  try {
    const message = {
      notification: { title, body },
      token: token,
    };

    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

module.exports = { sendPushNotification };
