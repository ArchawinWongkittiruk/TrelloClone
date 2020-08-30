const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const List = require('../../models/List');
const Card = require('../../models/Card');

// Add a card
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
      list.cards.push(card.id);
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

// Archive/Unarchive a card
router.patch('/archive/:archive/:id', auth, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ msg: 'Card not found' });
    }

    card.archived = req.params.archive === 'true';
    card.save();

    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Move a card
router.patch('/move/:cardId/:from/:to', auth, async (req, res) => {
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

// Delete a card
router.delete('/:id', auth, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    const list = await List.findById(req.body.listId);
    if (!card || !list) {
      return res.status(404).json({ msg: 'List/card not found' });
    }

    list.cards.splice(list.cards.indexOf(req.params.id), 1);
    await list.save();
    await card.remove();

    res.json({ msg: 'Card removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
