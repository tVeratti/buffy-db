const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  name: String,
  email: { type: String, select: false },
  google_id: { type: String, select: false },
  create_date: { type: Date, default: Date.now },
  active_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('user', User);
