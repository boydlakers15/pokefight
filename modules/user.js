const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  userName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 1024,
    select: false,
  },  
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  
});

userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.password = String(ret.password);
    return ret;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
