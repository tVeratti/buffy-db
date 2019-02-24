require('dotenv').load();

const nextAuthProviders = require('./next-auth.providers');
const nextAuthFunctions = require('./next-auth.functions');

// If we want to pass a custom session store then we also need to pass an
// instance of Express Session along with it.
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);

let sessionStore;
const { MONGO_CONNECTION, MONGO_USERNAME, MONGO_PASSWORD } = process.env;
if (MONGO_CONNECTION) {
  sessionStore = new MongoStore({
    url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CONNECTION}`,
    autoRemove: 'interval',
    autoRemoveInterval: 10, // Removes expired sessions every 10 minutes
    collection: 'sessions',
    stringify: false
  });
}

module.exports = () => {
  return nextAuthFunctions().then(functions => {
    return new Promise((resolve, reject) => {
      // This is the config block we return, ready to be passed to NextAuth
      resolve({
        // Define a port (if none passed, will not start Express)
        // Note: This project omits a port for NextAuth as it uses Express to
        // add additional routes for the examples, so it takes control of
        // starting Express, rather than leaving it to NextAuth.
        //port: process.env.PORT || 3000,
        // Secret used to encrypt session data on the server.
        sessionSecret: 'buffy-db',
        // Maximum Session Age in ms (optional, default is 7 days).
        // The expiry time for a session is reset every time a user revisits
        // the site or revalidates their session token. This is the maximum
        // idle time value.
        sessionMaxAge: 60000 * 60 * 24 * 7,
        // Session Revalidation in X ms (optional, default is 60 seconds).
        // Specifies how often a Single Page App should revalidate a session.
        // Does not impact the session life on the server, but causes clients
        // to refetch session info (even if it is in a local cache) after N
        // seconds has elapsed since it was last checked so they always display
        // state correctly.
        // If set to 0 will revalidate a session before rendering every page.
        sessionRevalidateAge: 60000,
        // Canonical URL of the server (optiona, but recommended).
        // e.g. 'http://localhost:3000' or 'https://www.example.com'
        // Used in callbak URLs and email sign in links. It will be auto
        // generated if not specified, which may cause problems if your site
        // uses multiple aliases (e.g. 'example.com and 'www.examples.com').
        serverUrl: process.env.SERVER_URL || null,
        // Add an Express Session store.
        expressSession: expressSession,
        sessionStore: sessionStore,
        // Define oAuth Providers
        providers: nextAuthProviders(),
        // Define functions for manging users and sending email.
        functions: functions
      });
    });
  });
};
