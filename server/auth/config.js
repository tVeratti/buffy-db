const OAuth2Strategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../models/user');

const googleAuth = {
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.CALLBACK_URL
};

console.log(googleAuth);

module.exports = passport => {
  // Used to serialize the user for the session.
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Used to deserialize the user.
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      if (err) throw err;
      done(err, user);
    });
  });

  passport.use(
    new OAuth2Strategy(googleAuth, (token, refreshToken, profile, done) => {
      // Make the code asynchronous.
      // User.findOne won't fire until we have all our data back from Google
      process.nextTick(function() {
        User.findOne({ google_id: profile.id }, (err, user) => {
          if (err) return done(err);

          // Return exisiting user.
          if (user) return done(null, user);

          // Create new User.
          const newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            google_id: profile.id
          });

          // Save the new user to the database.
          newUser.save(err => {
            if (err) throw err;
            return done(null, newUser);
          });
        });
      });
    })
  );
};
