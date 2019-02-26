var contentful = require('contentful');

var client = contentful.createClient({
  accessToken: process.env.CONTENT_TOKEN,
  space: process.env.CONTENT_SPACE
});

exports.client = client;
