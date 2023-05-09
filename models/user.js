const mongoose = require('mongoose');
const User = mongoose.Schema;

const userSchema = new User({
    _id: { type: mongoose.Types.ObjectId, auto: true },
    username: {
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
    }
});

userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.password = String(ret.password);
    return ret;
  }
});

module.exports = mongoose.model('users', userSchema);
