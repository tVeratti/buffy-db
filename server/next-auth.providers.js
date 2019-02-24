// Load environment variables from a .env file if one exists
require('dotenv').load();

module.exports = () => {
  return [
    {
      providerName: 'Google',
      providerOptions: {
        scope: ['profile', 'email']
      },
      Strategy: require('passport-google-oauth').OAuth2Strategy,
      strategyOptions: {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.CALLBACK_URL
      },
      getProfile(profile) {
        // Normalize profile into one with {id, name, email} keys
        return {
          id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value
        };
      }
    }
  ];
};
