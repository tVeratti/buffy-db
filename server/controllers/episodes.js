const express = require('express');
const { getCookie } = require('nookies');
const router = express.Router();

const Episodes = require('../domain/episodes');
const { getUser } = require('../util/user');

router.get('/', (req, res) => {
  const user = getUser(req.cookies || req.headers.cookie);
  Episodes.all(user).then(
    episodes =>
      // Episodes.content().then(content => {
      res.json({ episodes })
    //})
  );
});

router.post('/rate', (req, res) => {
  const user = getUser(req.cookies);
  if (!user) return res.sendStatus(401);

  const { _id, rating } = req.body;

  Episodes.rate(_id, user, rating)
    .then(() => Episodes.one(_id, user))
    .then(episode => res.json(episode));
});

module.exports = router;
