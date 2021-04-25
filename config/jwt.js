const jwt = require('jsonwebtoken');

// GENERATENTOKEN
const generateToken = (data) => {
  return new Promise((success, fail) => {
    jwt.sign(
      data,
      process.env.ACCESS_JWT_SECRET,
      { expiresIn: '30d' },
      (err, token) => {
        if (err) fail(err);
        else success(token);
      }
    );
  });
};

// VERIFYTOKEN
const verifyToken = (token) => {
  return new Promise((success, fail) => {
    jwt.verify(token, process.env.ACCESS_JWT_SECRET, (err, decoded) => {
      if (err) fail(err);
      else success(decoded);
    });
  });
};

module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;
