const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  archived: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = Card = mongoose.model('card', CardSchema);
