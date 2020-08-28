const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Lists route'));

module.exports = router;