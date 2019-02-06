const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const next = require('next');

require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Connect to MongoDb
// =========================================
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_CONNECTION } = process.env;
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CONNECTION}`;

mongoose.connect(url, { useNewUrlParser: true });

// Prepare NextJS App
// =========================================
app
  .prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    // API Routes
    server.use('/api', require('./routes'));

    // Masked routes
    server.get('/episodes/:number', (req, res) => {
      app.render(req, res, '/episodes', req.params);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
