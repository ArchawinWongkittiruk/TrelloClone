const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const member = require('../../middleware/member');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Board = require('../../models/Board');
const List = require('../../models/List');

// Add a list
router.post(
  '/',
  [auth, member, [check('title', 'Título é obrigatório').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const title = req.body.title;
      const boardId = req.header('boardId');

      // Create and save the list
      const newList = new List({ title });
      const list = await newList.save();

      // Assign the list to the board
      const board = await Board.findById(boardId);
      board.lists.push(list.id);

      // Log activity
      const user = await User.findById(req.user.id);
      board.activity.unshift({
        text: `${user.name} adicionado '${title}' para este quadro.`,
      });
      await board.save();

      res.json(list);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no Servidor');
    }
  }
);

// Get all of a board's lists
router.get('/boardLists/:boardId', auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      return res.status(404).json({ msg: 'Quadro não encontrado' });
    }

    const lists = [];
    for (const listId of board.lists) {
      lists.push(await List.findById(listId));
    }

    res.json(lists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});

// Get a list by id
router.get('/:id', auth, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ msg: 'Lista não encontrada' });
    }

    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});

// Edit a list's title
router.patch(
  '/rename/:id',
  [auth, member, [check('title', 'Título é obrigatório').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const list = await List.findById(req.params.id);
      if (!list) {
        return res.status(404).json({ msg: 'Lista não encontrada' });
      }

      list.title = req.body.title;
      await list.save();

      res.json(list);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no Servidor');
    }
  }
);

// Archive/Unarchive a list
router.patch('/archive/:archive/:id', [auth, member], async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ msg: 'Lista não encontrada' });
    }

    list.archived = req.params.archive === 'true';
    await list.save();

    // Log activity
    const user = await User.findById(req.user.id);
    const board = await Board.findById(req.header('boardId'));
    board.activity.unshift({
      text: list.archived
        ? `${user.name} lista arquivada '${list.title}'`
        : `${user.name} lista enviada '${list.title}' para o quadro`,
    });
    await board.save();

    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});

// Move a list
router.patch('/move/:id', [auth, member], async (req, res) => {
  try {
    const toIndex = req.body.toIndex ? req.body.toIndex : 0;
    const boardId = req.header('boardId');
    const board = await Board.findById(boardId);
    const listId = req.params.id;
    if (!listId) {
      return res.status(404).json({ msg: 'Lista não encontrada' });
    }

    board.lists.splice(board.lists.indexOf(listId), 1);
    board.lists.splice(toIndex, 0, listId);
    await board.save();

    res.send(board.lists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});

module.exports = router;
