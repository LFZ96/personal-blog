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

router.get('/:title', (req, res) => {

});

router.get('/:title/edit', (req, res) => {

});

module.exports = router;