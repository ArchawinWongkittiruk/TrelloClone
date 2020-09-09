const { Schema, model } = require('mongoose');

const CardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  label: {
    type: String,
  },
  archived: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = Card = model('card', CardSchema);
