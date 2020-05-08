const router = require('express').Router();

const User = require('./../models/User');
const { validatePassword, generatePassword } = require('./../util/helper');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Email or password incorrect'});
    }
  
    const isValid = validatePassword(password, user.password);
  
    if (isValid) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, message: 'Email or password incorrect' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const invalidEmail = await User.findOne({ email });

    if (invalidEmail) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    const hash = generatePassword(password);

    const newUser = new User({
      username,
      email,
      password: hash
    });
    
    const user = await newUser.save();

    res.status(200).json({ success: true, userId: user._id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;