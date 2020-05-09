const router = require('express').Router();

const User = require('./../models/User');
const { validatePassword, generatePassword } = require('./../util/helper');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User login unsuccessful: Email not found');
      return res.status(400).json({ success: false, message: 'Email or password incorrect'});
    }
  
    const isValid = validatePassword(password, user.password);

    if (isValid) {
      const sessionUser = {
        userId: user._id,
        username: user.username
      };

      req.session.user = sessionUser;

      console.log('User login successful');
      res.status(200).json({ success: true, user: sessionUser });
    } else {
      console.log('User login unsuccessful: Incorrect password');
      res.status(400).json({ success: false, message: 'Email or password incorrect' });
    }
  } catch (err) {
    console.log('Oops! Something went wrong!');
    res.status(500).json({ error: err.message });
  }
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const invalidEmail = await User.findOne({ email });

    if (invalidEmail) {
      console.log('That email already exists');
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    const hash = generatePassword(password);

    const newUser = new User({
      username,
      email,
      password: hash
    });
    
    const user = await newUser.save();

    console.log('New user registered successfully')
    res.status(200).json({ success: true, userId: user._id });
  } catch (err) {
    console.log('Registration unsuccessful');
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/logout', (req, res) => {
  console.log('Destroying session');
  if (req.session) {
    req.session.destroy();
  }
});

module.exports = router;