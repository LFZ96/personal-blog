const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');

const validateRegistration = user => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(2).max(16).required().error(new Error('Username must contain 2-16 characters, and must only use letters and numbers')),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,64})/).error(new Error('Password must contain between 8-64 characters, at least one lowercase letter, at least one upper case letter, at least one numerical digit, and at least one special character (!@#$%^&*)'))
  });

  return schema.validate(user);
};

const generatePassword = password => {
  return bcrypt.hashSync(password, 10);
};

const validatePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports.generatePassword = generatePassword;
module.exports.validatePassword = validatePassword;
module.exports.validateRegistration = validateRegistration;