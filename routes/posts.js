const router = require('express').Router();

const Post = require('./../models/Post');

// router.get('/', async (req, res) => {
//   try {
//     const posts = await Post.find().sort({ createdAt: 'desc' });
    
//     res.json(posts);
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// });

router.get('/:slug', async(req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.post('/new', async (req, res) => {
  const newPost = new Post({
    author: req.body.author,
    title: req.body.title,
    description: req.body.description,
    body: req.body.body
  });

  try {
    const post = await newPost.save();

    res.status(201).json({ success: true, postId: post._id });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }

  // newPost.save()
  // .then(post => res.status(200).json({ success: true, postId: post._id }))
  // .catch(err => res.status(500).json({ success: false, error: err }));
});

router.post('/:slug/edit', (req, res) => {
  Post.findOne({ slug: req.params.slug })
    .then(post => {
      post.title = req.body.title;
      post.description = req.body.description;
      post.body = req.body.body;

      post.save()
        .then(() => res.json({ success: true, }))
        .catch(err => res.status(400).json({ success: false, error: err }));
    })
    .catch(err => res.status(400).json({ success: false, error: err }));
});

router.delete('/:slug', (req, res) => {
  Post.findOneAndDelete({ slug: req.params.slug })
    .then(post => res.json({ success: true }))
    .catch(err => res.status(500).json({ success: false, error: err }));
})

module.exports = router;