const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: false,
    set: value => bcrypt.hashSync(value)
  },
  isAdmin: {
    type: String,
    required: false,
    default: false
  }
})

// Return JWT token
userSchema.methods.generateJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRETORKEY, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
}
module.exports = model('User', userSchema);