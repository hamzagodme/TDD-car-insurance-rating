const express = require('express');
const router = express.Router();
const { calculateQuote } = require('../controllers/carValueController');

router.post('/calculate-quote', calculateQuote);

module.exports = router;
