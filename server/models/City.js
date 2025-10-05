const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  population: {
    type: Number,
    required: true
  },
  foundedYear: {
    type: Number
  },
  images: [{
    url: String,
    caption: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: 'active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('City', citySchema);
