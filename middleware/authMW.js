const jwtAuth = require('../config/jwt');

// AUTHORIZATION WITH TOKEN
const CheckAuthenticated = async (req, res, next) => {
  try {
    req.jwtTokenData = await jwtAuth.verifyToken(req.session.jwtToken);
    next();
  } catch (err) {
    delete req.session.username;
    req.flash('error_msg', 'Please log in to view this resource');
    res.redirect('/auth/login');
  }
};

// ACCESS LIMIT (LOGGED IN)
const CheckIfLoggedAuthenticated = async (req, res, next) => {
  try {
    req.jwtTokenData = await jwtAuth.verifyToken(req.session.jwtToken);
    return res.redirect('/');
  } catch {
    next();
  }
};

module.exports.CheckAuthenticated = CheckAuthenticated;
module.exports.CheckIfLoggedAuthenticated = CheckIfLoggedAuthenticated;
