const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  google_id: { type: String, select: false }
});

module.exports = mongoose.model('user', User);
