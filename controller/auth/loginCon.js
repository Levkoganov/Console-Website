// CONFING AND MODEL PATH
const joiAuth = require('../../config/joi');
const jwtAuth = require('../../config/jwt');
const bcrypt = require('../../config/bcrypt');
const newUser = require('../../models/createUser');

// RENDER LOGIN PAGE
const loginGet = (req, res) => {
  res.render('login', {
    username: req.session.username,
    page_name: 'login',
  });
};

// LOGIN USERNAME AND PASSWORD
const loginPost = async (req, res) => {
  const { email, password, checkbox } = req.body;
  const errors = [];
  try {
    // CHECKING USER INPUT
    let inputData = await joiAuth.validateInputLoginAsync(req.body);
    // CHECKING IF EMAIL EXIST
    let checkCollection = await newUser.findOne({ email: inputData.email });
    // COMPARE PASSWORD
    if (checkCollection) {
      let passwordCheck = await bcrypt.checkPassword(
        inputData.password,
        checkCollection.password
      );
      if (passwordCheck) {
        // GENERATE TOKEN INTO THE USER
        let token = await jwtAuth.generateToken(inputData);
        req.session.jwtToken = token;
        req.session.username = checkCollection.name;
        req.session.collection = checkCollection;
        req.session.cookie.expires = false;
        if (checkbox) req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
        // console.log('CollectionName: ', req.session.username);
        // console.log('Collection: ', req.session.collection);
        // console.log('JWT: ', req.session.jwtToken);
        res.redirect('/');
        console.log('LOGGED IN :', passwordCheck);
        // INCORRECT PASSWORD
      } else {
        errors.push('Incorrect Password');
        res.render('login', {
          errors,
          email,
          page_name: 'login',
        });
      }
      //
    } else {
      // INCORRECT EMAIL
      errors.push('Incorrect Email');
      res.render('login', {
        errors,
        email,
        page_name: 'login',
      });
    }
    // RENDERING ERRORS AND INPUT
  } catch (err) {
    console.log(req.body.checkbox);
    let errors = err.details.map((item) => item.message);
    res.render('login', { errors, email, password, page_name: 'login' });
  }
};

// LOGOUT
const logOut = (req, res) => {
  delete req.session.jwtToken;
  delete req.session.username;
  req.flash('success_msg', 'You are logged out');
  res.redirect('/auth/login');
};

module.exports.loginGet = loginGet;
module.exports.loginPost = loginPost;
module.exports.logOut = logOut;
