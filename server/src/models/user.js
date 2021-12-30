const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const findOrCreate = require('mongoose-findorcreate');

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
    required: isSocialSignOn,
    trim: true,
    unique: true,
    sparse: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: isSocialSignOn,
    set: createPasswordHash,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
    immutable: true
  },
  googleId: {
    type: String,
    required: false,
    default: null,
    immutable: true
  }
})

function isSocialSignOn() {
  if ((this.googleId)) {
    return false;
  }
  return true;
}

// Return JWT token
userSchema.methods.generateJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRETORKEY, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
}
// pop some fields on transform to json (sending to frontend)
userSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    delete ret.password;
    delete ret.__v;
    delete googleId;
    return ret;
  }
}

userSchema.plugin(findOrCreate);
module.exports = model('User', userSchema);