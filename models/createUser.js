const mongoose = require('mongoose');

// CREATING NEW SCHEMA
const newUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// CREATING NEW COLLECTION("Users")
const addUser = mongoose.model('Users', newUserSchema);

module.exports = addUser;
