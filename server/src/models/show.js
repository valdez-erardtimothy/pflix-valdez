const { Schema, model } = require('mongoose');
const [intSchemaTypes] = require('../utils/propertySchemaTypes.js');


const showSchema = Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please put the title."],
    index: true
  },
  released: {
    type: Date,
    required: true
  },
  runtimeMinutes: intSchemaTypes,
  plot: {
    type: String,
    required: true
  },
  showType: {
    type: String,
    enum: ['Movie', 'TV Show'],
    required: true
  },
  images: [{
    type: String,
    required: true
  }]
}, { timestamps: true });

module.exports = model('Shows', showSchema);