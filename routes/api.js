const router = require('express').Router();

const Post = require('./../models/Post');
const User = require('./../models/User');

router.get('/posts', paginatedResults(Post), (req, res) => {
  res.json(res.paginatedResults);
});

router.get('/:slug', async(req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate('author').exec();

    res.json(post);
  } catch (err) {
    res.json({ error: err });
  }
});

router.post('/new', async (req, res) => {

  const authId = req.body.author;
  const { title, description, body } = req.body;

  const author = await User.findById(authId);

  const newPost = new Post({
    author: author._id,
    title,
    description,
    body
  });

  try {
    const post = await newPost.save();

    try {
      author.posts.push(post);

      await author.save();

      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, error: err });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

router.post('/:slug/edit', async (req, res) => {
  const { title, body, description } = req.body;
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    post.title = title;
    post.description = description;
    post.body = body;
  
    await post.save();
  
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete('/:slug', async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug });

    try {
      await User.updateOne({ _id: post.author }, { "$pull": { "posts": post._id }});
    } catch (err) {
      res.status(500).json({ success: false, error: err });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = 4;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const totalPosts = await model.countDocuments().exec();

    if (endIndex < totalPosts) {
      results.next = {
        page: page + 1
      };
    }
    
    if (startIndex > 0) {
      results.previous = {
        page: page - 1
      };
    }

    results.totalPosts = totalPosts;

    try {
      results.results = await model.find().populate('author').sort({ createdAt: 'desc' }).limit(limit).skip(startIndex).exec();

      res.paginatedResults = results;

      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

module.exports = router;