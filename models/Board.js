const { Schema, model } = require('mongoose');

const BoardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    lists: [
      {
        type: Schema.Types.ObjectId,
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

module.exports = Board = model('board', BoardSchema);
