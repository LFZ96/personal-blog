const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const Schema = mongoose.Schema;
const dompurify = createDOMPurify(new JSDOM().window);

const User = require('./User');

const PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
    // type: String,
    // required: true
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
  },
  sanitizedHTML: {
    type: String,
    required: true
  }
}, { timestamps: true });

PostSchema.pre('validate', function(next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.body) {
    this.sanitizedHTML = dompurify.sanitize(marked(this.body));
  }

  next();
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;