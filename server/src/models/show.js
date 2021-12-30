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
    required: false,
  }],
  genre: {
    type: String,
    required: false
  },
  reviews: [
    {
      user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true,
      },
      rating: {
        ...intSchemaTypes,
        min: 1,
        max: 5
      },
      comment: {
        type: String,
        required: false,
      }
    }
  ],
  ratings: {
    type: Number,
    required: false,
    min: 1,
    max: 5
  },
  reviewCount: {
    ...intSchemaTypes,
    default: 0
  }
}, { timestamps: true });

module.exports = model('Show', showSchema);