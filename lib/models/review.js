const mongoose = require('mongoose');
const { Schema } = mongoose;
const reviewSchema = new Schema({
  rating: {
    type: Number,
    required: true,
    min: 1, 
    max: 5
  },
  reviewer: {
    review_id: {
      type: String,
      required: true
    }
  },
  review: {
    type: String,
    required: true,
    maxlength: 140
  }, 
  film: {
    type: String,
    require: true
  },
  createdAt: new Date(),
  updatedAt: new Date()
});

module.exports = mongoose.model('Reviews', reviewSchema);