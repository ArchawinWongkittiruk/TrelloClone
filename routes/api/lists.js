const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const List = require('../../models/List');
const Board = require('../../models/Board');

// Create a list
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, boardId } = req.body;

      // Create and save the list
      const newList = new List({ name });
      const list = await newList.save();

      // Assign the list to the board
      const board = await Board.findById(boardId);
      board.lists.unshift(list.id);
      await board.save();

      res.json(list);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Archive a list
router.patch('/archive/:id', auth, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ msg: 'List not found' });
    }

    list.archived = true;
    list.save();

    res.json({ msg: 'List archived' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Unarchive a list
router.patch('/unarchive/:id', auth, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ msg: 'List not found' });
    }

    list.archived = false;
    list.save();

    res.json({ msg: 'List back on board' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
