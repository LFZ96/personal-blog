require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const volleyball = require('volleyball');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');

(async () => {
  try {
    let DB_STRING;
    if (process.env.NODE_ENV === 'production') {
      DB_STRING = process.env.MONGO_URI;
    } else {
      DB_STRING = process.env.MONGO_STRING;
    }

    await mongoose.connect(DB_STRING, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connection established successfully.');

    const app = express();

    // MIDDLEWARES
    app.use(helmet());
    app.use(cors());
    app.use(volleyball);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    // ROUTES
    app.use('/', indexRouter);
    app.use('/posts', postsRouter);
    
    // SERVER
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));

  } catch (err) {
    console.log(`MongoDB connection error: ${err}`);
  }
})();