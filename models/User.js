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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'boards'
    }
  ]
});

module.exports = User = mongoose.model('user', UserSchema);
