const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

// const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');

const app = express();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/blog', {
// mongoose.connect('mongodb+srv://loganz:Furman96@cluster0-qwemu.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('connected', () => console.log('MongoDB connection established successfully.'));

app.use(helmet());
app.use(morgan('tiny'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/', indexRouter);
app.use('/posts', postsRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));