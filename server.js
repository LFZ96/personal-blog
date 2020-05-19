const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api');

const app = express();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/blog', {
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

app.use(session({
  name: process.env.SESS_NAME || 'sid',
  secret: process.env.SESS_SECRET || 'secret',
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({
    mongooseConnection: db,
    collection: 'session',
    ttl: parseInt(process.env.SESS_LIFETIME || 1000 * 60 * 60 * 24) / 1000
    // ttl: parseInt(1000 * 60 * 60 * 24) / 1000
  }),
  cookie: {
    // sameSite: true,
    // secure: process.env.NODE_ENV === 'production',
    maxAge: parseInt(process.env.SESS_LIFETIME || 1000 * 60 * 60 * 24)
  }
}));

app.use('/auth', authRouter);
app.use('/api', apiRouter);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));