
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    phone: String,
    email: String,
    password: String,
    role: String,
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
    fcmToken:String
});

module.exports = mongoose.model('User', userSchema);
