const { Schema, model } = require('mongoose');

const filmProducerSchema = Schema({
  producer: {
    type: Schema.Types.ObjectId,
    ref: 'Producer',
    require: true
  },
  show: {
    type: Schema.Types.ObjectId,
    ref: 'Show',
    require: true
  }
})

module.exports = model('ShowProducer', filmProducerSchema);