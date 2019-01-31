const router = require('express').Router();
const episodes = require('./controllers/episodes');

router.use('/episodes', episodes);

module.exports = router;
