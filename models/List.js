const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'cards',
    },
  ],
});

module.exports = List = mongoose.model('list', ListSchema);
