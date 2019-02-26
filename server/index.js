const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const next = require('next');

require('dotenv').config();

const {
  NODE_ENV,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_CONNECTION,
  PORT
} = process.env;

const dev = NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Connect to MongoDb
// =========================================
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
    server.use(cookieParser(process.env.JWT_SECRET));

    // Authentication
    require('./auth/config')(passport);
    server.use(passport.initialize());
    server.use('/auth', require('./auth/routes')(passport));

    // API Routes
    server.use('/api', require('./routes'));

    // Masked routes
    server.get('/episodes/:number', (req, res) => {
      app.render(req, res, '/episodes', req.params);
    });

    server.get('/', (req, res) => res.redirect('/episodes'));

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT || 3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
