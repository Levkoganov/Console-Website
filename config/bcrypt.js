const bcrypt = require('bcryptjs');

// ENCRYPTED PASSWORD
const generatePassword = (password) => {
  return new Promise((success, error) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) error(err);
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) error(err);
        else success(hash);
      });
    });
  });
};

// DECRYPTING PASSWORD
const checkPassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports.generatePassword = generatePassword;
module.exports.checkPassword = checkPassword;
