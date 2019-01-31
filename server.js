const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Connect to MongoDb
// =========================================
const username = 'xx';
const password = 'xx';
const url =
  `mongodb://${username}:${password}` +
  'cluster0-shard-00-00-2omka.mongodb.net:27017,' +
  'cluster0-shard-00-01-2omka.mongodb.net:27017,' +
  'cluster0-shard-00-02-2omka.mongodb.net:27017/buffy' +
  '?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

mongoose.connect(
  url,
  { useNewUrlParser: true }
);

// Prepare NextJS App
// =========================================
app
  .prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    // API Routes
    server.use('/api', require('./server/routes'));

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
