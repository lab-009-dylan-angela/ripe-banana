const mongoose = require('mongoose');
const { Schema } = mongoose;
const actorSchema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  dob: { type: Number },
  pob: { type: String }
});

module.exports = mongoose.model('Actors', actorSchema);