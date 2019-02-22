const express = require('express');
const router = express.Router();

const Episodes = require('../domain/episodes');
const userId = '123';

router.get('/', (req, res) => {
  Episodes.all(userId).then(episodes => res.json(episodes));
});

router.post('/rate', (req, res) => {
  const { _id, rating } = req.body;

  Episodes.rate(_id, userId, rating)
    .then(() => Episodes.one(_id, userId))
    .then(episode => res.json(episode));
});

module.exports = router;
