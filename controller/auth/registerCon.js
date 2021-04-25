const joiAuth = require('../../config/joi');
const bcrypt = require('../../config/bcrypt');
const newUser = require('../../models/createUser');

// RENDER REGISTER PAGE
const registerGet = (req, res) => {
  res.render('register', {
    username: req.session.username,
    page_name: 'register',
  });
};

// CREATING NEW USER
const registerPost = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];
  try {
    // CHECK USER INPUT
    let data = await joiAuth.validateInputAsync(req.body);
    // HASH PASSWORD
    let hashPassword = await bcrypt.generatePassword(data.password);
    // CHECKING FOR EXISTED EMAIL
    let checkEmail = await newUser.findOne({ email: data.email });
    if (checkEmail) {
      errors.push('Email is already registerd');
      res.render('register', {
        errors,
        name,
        email,
        password,
        confirm_password,
        page_name: 'register',
      });
    } else {
      // INSERTING USER INTO THE DATABASE
      const newuser = new newUser({
        name,
        email,
        password: hashPassword,
      });
      newuser.save();
      console.log(newuser);
      req.flash('success_msg', 'You are registered');
      res.redirect('/auth/login');
    }
    // RENDERING ERRORS AND INPUT
  } catch (err) {
    console.log(err);
    let errors = err.details.map((item) => item.message);
    res.render('register', {
      errors,
      name,
      email,
      password,
      confirm_password,
      page_name: 'register',
    });
  }
};

module.exports.registerGet = registerGet;
module.exports.registerPost = registerPost;
