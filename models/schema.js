const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  licenseNumber: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  car: {
    make: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    plateNumber: {
      type: String,
      required: true
    }
  }
});
const User = mongoose.model('User', userSchema);
module.exports = User;