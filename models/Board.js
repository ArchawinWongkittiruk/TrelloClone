const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'lists',
    },
  ],
  backgroundURL: {
    type: String,
  },
});

module.exports = Board = mongoose.model('board', BoardSchema);
