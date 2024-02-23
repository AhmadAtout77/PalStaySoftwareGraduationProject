const admin = require('firebase-admin');
const serviceAccount = require('./palrent-7ca34-firebase-adminsdk-dexih-ca4f3f723c.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
