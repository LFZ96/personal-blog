const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: {
    // type: Schema.Types.ObjectId,
    // ref: 'User'
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

PostSchema.pre('validate', function() {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  next();
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;