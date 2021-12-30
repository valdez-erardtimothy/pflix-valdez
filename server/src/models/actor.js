const { Schema, model } = require('mongoose');


const actorSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: [true, `please put the actor's name.`],
    index: true
  },
  notes: {
    type: String,
    required: false
  },
  images: [{
    type: String,
    required: false
  }]
}, { timestamps: true });

module.exports = model('Actor', actorSchema);