const Board = require('../models/Board');

module.exports = async function (req, res, next) {
  const board = await Board.findById(req.header('boardId'));
  if (!board) {
    return res.status(404).json({ msg: 'Board not found' });
  }

  const members = board.members.map((member) => member.user);
  if (members.includes(req.user.id)) {
    next();
  } else {
    res.status(401).json({ msg: 'You must be a member of this board to make changes' });
  }
};
