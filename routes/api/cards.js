const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Card = require('../../models/Card');
const List = require('../../models/List');

// Create a card
router.post(
  '/',
  [auth, [check('title', 'Title is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, listId } = req.body;

      // Create and save the card
      const newCard = new Card({ title });
      const card = await newCard.save();

      // Assign the card to the list
      const list = await List.findById(listId);
      list.cards.unshift(card.id);
      await list.save();

      res.json(card);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Edit a card's title and/or description
router.patch('/:id', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (title === '') {
      return res.status(400).json({ msg: 'Title is required' });
    }

    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ msg: 'Card not found' });
    }

    card.title = title ? title : card.title;
    card.description = description ? description : card.description;
    card.save();

    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
