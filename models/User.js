const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  checkedIn: {
    type: String,
    default: null
  },
  partyOption: {
    type: Object,
  },
  OMW: {
    type: String,
    default: null
  }

});

module.exports = User = mongoose.model('user', UserSchema);