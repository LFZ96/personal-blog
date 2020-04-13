const express = require('express');
const router = express.Router();

const Post = require('./../models/Post');

router.get('/new', (req, res) => {
  res.render('posts/new', { post: new Post() });
});

// Post new article and redirect to posts if successful
router.post('/', async (req, res) => {
  let newPost = new Post({
    title: req.body.title,
    description: req.body.description,
    body: req.body.body
  });

  try {
    savedPost = await newPost.save();
    res.redirect('/');
  } catch (err) {
    
  }
});

router.get('/:slug', async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  res.render('show', { post: post });
});

router.get('/:slug/edit', async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  res.render('edit', { post: post });
});

module.exports = router;