const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  type: { type: String, required: true },
 // name: { type: String, required: true },
  location: {
    city: String,
    lat: String,
    lon: String,
  },
  offer: {
    isActive: { type: Boolean, default: false },
    discountPercent: { type: Number, default: 0 }
  },
  area: { type: Number, required: true },
  rooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  price: { type: Number, required: true },
  facilities: [String],
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imagePath: [String],
  videoPath: String,
  valid:{ type: Boolean, default: false }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Property', propertySchema);
