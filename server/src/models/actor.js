const { Schema, model } = require('mongoose');
const [intSchemaTypes] = require('../utils/propertySchemaTypes');

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
  }],
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
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

module.exports = model('Actor', actorSchema);