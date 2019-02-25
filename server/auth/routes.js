const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

module.exports = passport => {
  // Passport Authenticate
  // ------------------------------
  router.get(
    '/google',
    passport.authenticate('google', {
      session: false,
      scope: ['openid']
    })
  );

  // Callback after google has authenticated the user.
  // ------------------------------
  router.get(
    '/callback',
    passport.authenticate('google', {
      session: false
    }),
    (req, res) => {
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);

      res.cookie('user', token);
      res.redirect('/');
    }
  );

  // End session & logout
  // ------------------------------
  router.get('/logout', (req, res) => {
    res.clearCookie('user');
    res.redirect('/');
  });

  return router;
};
