const router = require('express').Router();

const Post = require('./../models/Post');
const User = require('./../models/User');

router.post('/user', async (req, res) => {
  const { id } = req.body;
  const user = await User.findOne({ id});

  return res.json({ user: user });
});

router.get('/posts', paginatedResults(Post), (req, res) => {
  // try {
  //   const posts = await Post.find().sort({ createdAt: 'desc' });
    
  //   res.json(posts);
  // } catch (err) {
  //   res.status(500).json({ error: err });
  // }
  res.json(res.paginatedResults);
});

router.get('/:slug', async(req, res) => {
  // Post.
  //   findOne({ slug: req.params.slug }).
  //   populate('author').
  //   exec(function (err, post) {
  //     if (err) return handleError(err);

  //     res.json(post);
  //   });

  try {
    const post = await Post.findOne({ slug: req.params.slug });

    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err });
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


  // try {
  //   await author.save(async () => {
  //     const newPost = new Post({
  //       author: author._id,
  //       title,
  //       description,
  //       body
  //     });

  //     try {
  //       const post = await newPost.save();

  //       author.posts.push(post);
  //     } catch (err) {
  //       res.status(500).json({ success: false, error: err });
  //     }

  //     res.status(201).json({ success: true });
  //   });
  // } catch (err) {
  //   res.status(500).json({ success: false, error: err });
  // }
  // const newPost = new Post({
  //   author: req.body.author,
  //   title: req.body.title,
  //   description: req.body.description,
  //   body: req.body.body
  // });

  // try {
  //   const post = await newPost.save();


  //   res.status(201).json({ success: true, postId: post._id });
  // } catch (err) {
  //   res.status(500).json({ success: false, error: err });
  // }
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
    await Post.findOneAndDelete({ slug: req.params.slug });

    res.json({ success: true });
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
      results.results = await model.find().sort({ createdAt: 'desc' }).limit(limit).skip(startIndex).exec();

      res.paginatedResults = results;

      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

module.exports = router;