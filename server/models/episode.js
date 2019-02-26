const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const episode = new Schema({
  number: Number,
  title: String,
  directed_by: String,
  written_by: String,
  story_by: String,
  teleplay_by: String,
  air_date: Date,
  use_viewers: Number,
  teaser: String,
  season: String,
  ratings: {
    default: [],
    type: [
      {
        user: String,
        value: Number
      }
    ]
  }
});

module.exports = mongoose.model('episode', episode);
