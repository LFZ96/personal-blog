const bcrypt = require('bcrypt');

const generatePassword = password => {
  return bcrypt.hashSync(password, 10);
};

const validatePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports.generatePassword = generatePassword;
module.exports.validatePassword = validatePassword;