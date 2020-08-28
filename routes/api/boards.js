const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Boards route'));

module.exports = router;