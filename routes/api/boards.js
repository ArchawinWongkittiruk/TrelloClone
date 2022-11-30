const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const member = require('../../middleware/member');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Board = require('../../models/Board');

// Add a board
router.post(
  '/',
  [auth, [check('title', 'O título é obrigatório').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, backgroundURL } = req.body;

      // Create and save the board
      const newBoard = new Board({ title, backgroundURL });
      const board = await newBoard.save();

      // Add board to user's boards
      const user = await User.findById(req.user.id);
      user.boards.unshift(board.id);
      await user.save();

      // Add user to board's members as admin
      board.members.push({ user: user.id, name: user.name });

      // Log activity
      board.activity.unshift({
        text: `${user.name} Criou este quadro`,
      });
      await board.save();

      res.json(board);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no Servidor');
    }
  }
);

// Get user's boards
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const boards = [];
    for (const boardId of user.boards) {
      boards.push(await Board.findById(boardId));
    }

    res.json(boards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});

// Get a board by id
router.get('/:id', auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ msg: 'Quadro não encontrado!' });
    }

    res.json(board);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});

// Get a board's activity
router.get('/activity/:boardId', auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      return res.status(404).json({ msg: 'Quadro não encontrado!' });
    }

    res.json(board.activity);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});

// Change a board's title
router.patch(
  '/rename/:id',
  [auth, member, [check('title', 'Título é obrigatório').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const board = await Board.findById(req.params.id);
      if (!board) {
        return res.status(404).json({ msg: 'Quadro não encontrado' });
      }

      // Log activity
      if (req.body.title !== board.title) {
        const user = await User.findById(req.user.id);
        board.activity.unshift({
          text: `${user.name} quadro renomeado (from '${board.title}')`,
        });
      }

      board.title = req.body.title;
      await board.save();

      res.json(board);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no Servidor');
    }
  }
);

// Add a board member
router.put('/addMember/:userId', [auth, member], async (req, res) => {
  try {
    const board = await Board.findById(req.header('boardId'));
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    // See if already member of board
    if (board.members.map((member) => member.user).includes(req.params.userId)) {
      return res.status(400).json({ msg: 'Já é um membro' });
    }

    // Add board to user's boards
    user.boards.unshift(board.id);
    await user.save();

    // Add user to board's members with 'normal' role
    board.members.push({ user: user.id, name: user.name, role: 'normal' });

    // Log activity
    board.activity.unshift({
      text: `${user.name} juntou-se a esta quadro`,
    });
    await board.save();

    res.json(board.members);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});

module.exports = router;
