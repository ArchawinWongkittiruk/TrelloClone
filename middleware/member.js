const Board = require('../models/Board');

module.exports = async function (req, res, next) {
  const board = await Board.findById(req.header('boardId'));
  if (!board) {
    return res.status(404).json({ msg: 'Quadro não encontrado' });
  }

  const members = board.members.map((member) => member.user);
  if (members.includes(req.user.id)) {
    next();
  } else {
    res.status(401).json({ msg: 'Você deve ser um membro deste quadro para fazer alterações' });
  }
};
