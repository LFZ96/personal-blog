const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blog', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connection established successfully.');

    const app = express();

    // MIDDLEWARES
    app.use(helmet());
    app.use(cors());
    app.use(morgan('tiny'));

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    // ROUTES
    app.use('/', indexRouter);
    app.use('/posts', postsRouter);

    if (process.env.NODE_ENV === 'production') {
      app.use(express.static('./client/build'));
    }
    
    // SERVER
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));

  } catch (err) {
    console.log(`MongoDB connection error: ${err}`);
  }
})();