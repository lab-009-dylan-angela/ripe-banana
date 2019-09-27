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
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Reviewers'
    }
  },
  review: {
    type: String,
    required: true,
    maxlength: 140
  }, 
  film: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Films'
  }
});

module.exports = mongoose.model('Reviews', reviewSchema);