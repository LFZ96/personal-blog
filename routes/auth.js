const router = require('express').Router();

const User = require('./../models/User');
const { validatePassword, generatePassword, validateRegistration } = require('./../util/helper');

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
        username: user.fullName
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
  const { firstName, lastName, email, password } = req.body;

  // Validate user's registration inputs
  const { error } = validateRegistration({ firstName, lastName, email, password });
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message })
  }

  try {
    // Check to see if user's email input already exists in database
    const invalidEmail = await User.findOne({ email });

    if (invalidEmail) {
      console.log('That email already exists');
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    // Hash the user's password input
    const hash = generatePassword(password);

    // Create new user from user's valid registration inputs
    const newUser = new User({
      name: {
        first: firstName,
        last: lastName
      },
      email,
      password: hash
    });
    
    // Save the user to the database
    const user = await newUser.save();

    console.log('New user registered successfully')
    res.status(200).json({ success: true, userId: user._id });
  } catch (err) {
    console.log('Registration unsuccessful');
    res.status(500).json({ success: false, message: err.message });
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
    console.log('Destroying session');
    req.session.destroy();
    res.json({ auth: false });
  }
});

module.exports = router;