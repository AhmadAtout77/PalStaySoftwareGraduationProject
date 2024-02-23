// models/review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comment: String,
    rate: Number,
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
    date:String
});

module.exports = mongoose.model('Review', reviewSchema);
