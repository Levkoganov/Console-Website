// RENDER MAIN AUTH PAGE
const auth = (req, res) => {
  res.render('auth', {
    username: req.session.username,
    page_name: 'auth',
  });
};

module.exports.auth = auth;
