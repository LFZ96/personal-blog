const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  // username: {
  //   type: String,
  //   required: true
  // },
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

UserSchema.virtual('fullName').get(function() {
  return `${this.name.first} ${this.name.last}`;
});

const User = mongoose.model('User', UserSchema);

module.exports = User;