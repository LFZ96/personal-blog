require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');

// Require in routers
const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');

const app = express();

// Connect to DB
const DATABASE_URI = process.env.DATABASE_URI;
mongoose.connect(DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('MongoDB connection established successfully'));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));

// Router middleware
app.use('/', indexRouter);
app.use('/admin', authRouter);
app.use('/posts', postsRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));