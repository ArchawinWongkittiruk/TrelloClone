const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Board = require('../../models/Board');

// Add a board
router.post(
  '/',
  [auth, [check('title', 'Title is required').not().isEmpty()]],
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

      // Assign the board to the user
      const user = await User.findById(req.user.id);
      user.ownedBoards.unshift(board.id);
      await user.save();

      // Log activity
      board.activity.unshift({
        text: `${user.name} created this board`,
      });
      await board.save();

      res.json(board);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Get all owned boards
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const boards = [];
    for (const boardId of user.ownedBoards) {
      boards.push(await Board.findById(boardId));
    }

    res.json(boards);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a board by id
router.get('/:id', auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ msg: 'Board not found' });
    }

    res.json(board);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Change a board's title
router.patch(
  '/rename/:id',
  [auth, [check('title', 'Title is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const board = await Board.findById(req.params.id);
      if (!board) {
        return res.status(404).json({ msg: 'Board not found' });
      }

      // Log activity
      const user = await User.findById(req.user.id);
      board.activity.unshift({
        text: `${user.name} renamed this board (from ${board.title})`,
      });

      board.title = req.body.title;
      await board.save();

      res.json(board);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
