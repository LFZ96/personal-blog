const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');

const PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
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
    required: true
  }
}, {
  timestamps: true
});

PostSchema.pre('validate', function(next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  next();
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;

