const express = require('express');
const router = express.Router();

const Episodes = require('../domain/episodes');
const userId = '123';

router.get('/', (req, res) => {
  Episodes.all(userId).then(episodes => res.json(episodes));
});

router.post('/rate', (req, res) => {
  const { _id, rating } = req.params;
  Episodes.rate(userId, _id, rating);
  Episodes.one(_id).then(episode => res.json(episode));
});

module.exports = router;
