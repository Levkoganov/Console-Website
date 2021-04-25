// RENDER HOME PAGE
const home = (req, res) => {
  res.render('home', {
    username: req.session.username, // username session
    page_name: 'home', // page_name class(active)
  });
};

module.exports.home = home;
