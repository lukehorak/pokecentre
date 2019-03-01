const express = require('express');
const getHighlights = require('../../getHighlights.js');
const router = express.Router();

router.get('/', (req, res) => {
  var data = getHighlights.testData;
  res.json(data);
})

module.exports = router;