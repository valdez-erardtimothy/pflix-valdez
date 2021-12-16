const { Schema, model } = require('mongoose');
const Show = require('./show');
const Actor = require('./actor')
const filmographySchema = Schema({
  show: {
    type: Schema.Types.ObjectId,
    ref: "Show",
    required: true
  },
  actor: {
    type: Schema.Types.ObjectId,
    ref: "Actor",
    required: true
  },
  character: {
    Type: String,
    required: false
  }
});

module.exports = model('Filmography', filmographySchema);