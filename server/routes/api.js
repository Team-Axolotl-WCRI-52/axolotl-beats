const express = require('express');

const router = express.Router();

router.get('/auth', (req, res) => {
  res.status(200).json({ okay: 'okay' });
});

module.exports = router;