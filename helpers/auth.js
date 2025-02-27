const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'No autoriado');
  res.redirect('/users/login');
};

module.exports = helpers;
