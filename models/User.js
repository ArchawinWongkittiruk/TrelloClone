const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  ownedBoards: [
    {
      _id: false,
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'boards',
      },
      title: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = User = mongoose.model('user', UserSchema);
