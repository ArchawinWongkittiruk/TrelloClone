const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const List = require('../../models/List');
const Board = require('../../models/Board');

// Get a list by id
router.get('/:id', auth, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ msg: 'List not found' });
    }

    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a list
router.post(
  '/',
  [auth, [check('title', 'Title is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, boardId } = req.body;

      // Create and save the list
      const newList = new List({ title });
      const list = await newList.save();

      // Assign the list to the board
      const board = await Board.findById(boardId);
      board.lists.push(list.id);
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

    res.json(list);
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

    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Edit a list's title
router.patch(
  '/rename/:id',
  [auth, [check('title', 'Title is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const list = await List.findById(req.params.id);
      if (!list) {
        return res.status(404).json({ msg: 'List not found' });
      }

      list.title = req.body.title;
      list.save();

      res.json(list);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Move a card
router.patch('/moveCard/:cardId/:from/:to', auth, async (req, res) => {
  try {
    const cardId = req.params.cardId;
    const from = await List.findById(req.params.from);
    const to = await List.findById(req.params.to);
    if (!cardId || !from || !to) {
      return res.status(404).json({ msg: 'List/card not found' });
    }

    from.cards.splice(from.cards.indexOf(cardId), 1);
    await from.save();

    if (!to.cards.includes(cardId)) {
      to.cards.push(cardId);
      await to.save();
    }

    res.send({ from, to });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
