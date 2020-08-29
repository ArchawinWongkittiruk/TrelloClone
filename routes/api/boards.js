const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Board = require('../../models/Board');
const User = require('../../models/User');

// Get all owned boards
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.json(user.ownedBoards);
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

// Create a board
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
      const user = await User.findById(req.user.id).select('-password');
      user.ownedBoards.unshift(board.id);
      await user.save();

      res.json(board);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Change a board's title
router.patch(
  '/:id',
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

      board.title = req.body.title;
      board.save();

      res.json(board);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Get all of a board's lists
router.get('/lists/:boardId', auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);

    res.json(board.lists);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
