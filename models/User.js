const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Post = require('./Post');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
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
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;