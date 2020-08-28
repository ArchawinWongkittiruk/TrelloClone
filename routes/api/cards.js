const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Cards route'));

module.exports = router;