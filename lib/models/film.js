const mongoose = require('mongoose');
const { Schema } = mongoose;
const filmSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  studio: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Studios'
  },
  released: {
    type: Number,
    maxlength: 4,
    minlength: 4,
    required: true,
  },
  cast: [{
    role: String,
    actor: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Actors'
    }
  }], 
});

module.exports = mongoose.model('Films', filmSchema);