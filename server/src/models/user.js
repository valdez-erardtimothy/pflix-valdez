const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createPasswordHash = (val) => {
  if (val && typeof val !== 'string') val = '';
  return bcrypt.hashSync(val);
}

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
    set: createPasswordHash,
    select: false,
  },
  isAdmin: {
    type: String,
    required: false,
    default: false,
    immutable: true
  }
})

// Return JWT token
userSchema.methods.generateJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRETORKEY, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
}
module.exports = model('User', userSchema);