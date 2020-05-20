const router = require('express').Router();
const path = require('path');

const apiRoutes = require('./api');
const authRoutes = require('./auth');

router.use('/api', apiRoutes);
router.use('/auth', authRoutes);

router.use(function(req, res) {
  res.sendfile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;