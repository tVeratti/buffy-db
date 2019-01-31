const express = require('express');
const router = express.Router();

const Episode = require('../models/episode');

router.get('/', function(req, res) {
  Episode.find({}).then(episodes => res.json(episodes));
});

module.exports = router;
