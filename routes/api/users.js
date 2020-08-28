const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('User route'));

module.exports = router;