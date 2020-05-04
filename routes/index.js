const express = require('express');
const router = express.Router();

const Post = require('./../models/Post');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: 'desc' });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;