const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const posts = [
    {
      author: 'Logan Zipkes',
      title: 'Test Post',
      description: 'This is a test description for test article #1',
      body: 'asdfasdfasdfasdfasdfasdfasdf',
      slug: 'test-post',
      createdAt: new Date()
    },
    {
      author: 'Logan Zipkes',
      title: 'Test Post 2',
      description: 'This is a test description for test article #2',
      body: 'asdfasdfasdfasdfasdfasdfasdf',
      slug: 'test-post2',
      createdAt: new Date()
    }
  ];

  res.render('posts/index', { posts: posts });
});

module.exports = router;