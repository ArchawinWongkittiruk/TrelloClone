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
      user.ownedBoards.unshift({ id: board.id, title: board.title });
      await user.save();

      res.json(board);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
