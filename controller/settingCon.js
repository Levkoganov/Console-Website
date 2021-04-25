// const joiAuth = require('../config/joi');
const newUser = require('../models/createUser');

// RENDER SETTING/UPDATE PAGE
const updateGet = (req, res) => {
  res.render('update', {
    username: req.session.username, // username session
    collection: req.session.collection, // compare
    page_name: 'settings', // page_name class(active)
  });
};

// UPDATE EXISTED USERNAME
const updatePost = async (req, res) => {
  const { oldname, newname } = req.body;
  const errors = [];

  if (newname.length < 3) {
    errors.push('Newusername is too short');
    res.render('update', {
      username: req.session.username,
      collection: req.session.collection,
      page_name: 'settings',
      errors,
    });
  } else {
    // FIND THAN UPDATE USERNAME
    newUser.findOneAndUpdate(
      { name: oldname },
      { name: newname },
      { new: true },
      (err, result) => {
        // IF USERNAME NOT FOUND
        if (result == null) {
          console.log('error:', err);

          // IF USERNAME FOUND
        } else {
          console.log('success', result);
          req.session.username = result.name;
          res.redirect('/');
        }
      }
    );
  }
};

module.exports.updateGet = updateGet;
module.exports.updatePost = updatePost;
