const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const posts = [
    {
      author: 'Logan Zipkes',
      title: 'Test Post',
      description: 'Test description',
      body: 'asdfasdfasdfasdfasdfasdfasdf',
      createdAt: new Date()
    },
    {
      author: 'Logan Zipkes',
      title: 'Test Post 2',
      description: 'Test description',
      body: 'asdfasdfasdfasdfasdfasdfasdf',
      createdAt: new Date()
    }
  ];

  res.render('posts/index', { posts: posts });
});

module.exports = router;