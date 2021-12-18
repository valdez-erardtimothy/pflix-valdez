const { Schema, model } = require('mongoose');


const producerSchema = Schema({
  name: {
    type: String,
    trim: true,
    require: [true, "Please enter a producer name"],
    index: true
  },
  email: {
    type: String,
    required: false
  },
  website: {
    type: String,
    required: false
  },
})

module.exports = model('Producer', producerSchema);