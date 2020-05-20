const router = require('express').Router();

const User = require('./../models/User');
const { validatePassword, generatePassword, validateRegistration } = require('./../util/helper');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'Email or password incorrect'});
    }
  
    const isValid = validatePassword(password, user.password);

    if (isValid) {
      const sessionUser = {
        userId: user._id,
        username: user.username
      };

      req.session.user = sessionUser;

      res.status(200).json({ success: true, user: sessionUser });
    } else {
      res.json({ success: false, message: 'Email or password incorrect' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validate user's registration inputs
  const { error } = validateRegistration({ username, email, password });

  if (error) {
    return res.json({ success: false, message: error.message });
  }

  try {
    // Check to see if user's username input already exists in database
    const invalidUsername = await User.findOne({ username });

    if (invalidUsername) {
      return res.json({ success: false, message: 'Username already exists' });
    }

    // Check to see if user's email input already exists in database
    const invalidEmail = await User.findOne({ email });

    if (invalidEmail) {
      return res.json({ success: false, message: 'Email already exists' });
    }

    // Hash the user's password input
    const hash = generatePassword(password);

    // Create new user from user's valid registration inputs
    const newUser = new User({
      username,
      email,
      password: hash
    });
    
    // Save the user to the database
    const user = await newUser.save();

    res.status(200).json({ success: true, userId: user._id });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

router.get('/isAuthenticated', (req, res) => {
  if (req.session.user) {
    return res.json({ auth: true, user: req.session.user });
  }

  return res.json({ auth: false });
});

router.get('/logout', (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    res.json({ auth: false });
  }
});

module.exports = router;