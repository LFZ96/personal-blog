const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Post = require('./Post');

const UserSchema = new Schema({
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
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
}, { timestamps: true });

UserSchema.virtual('fullName').get(function() {
  return `${this.name.first} ${this.name.last}`;
});

const User = mongoose.model('User', UserSchema);

module.exports = User;