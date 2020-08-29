const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

module.exports = Board = mongoose.model('board', BoardSchema);
