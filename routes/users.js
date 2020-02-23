var express = require('express');
var router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const {isAuthenticated} = require('../helpers/auth');

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('users/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/tickets',
  failureRedirect: '/users/login',
  failureFlash: true
}));

router.get('/signup', function(req, res, next) {
  res.render('users/signup');
});

router.post('/signup', async function(req, res, next) {
  var {name, email, password, confirm_password} = req.body;
  if(password != confirm_password){
    req.flash('error_msg', 'Las contraseñas no coinciden');
    res.render('users/signup', {name, email, password, confirm_password});
  }
  if(password.length < 6){
    req.flash('error_msg', 'La contraseña debe contener al menos 6 caracteres');
    res.render('users/signup', {name, email, password, confirm_password});
  }
  else {
    var emailUser = await User.findOne({email: email});
    if(emailUser){
      req.flash('error_msg', 'El mail ya existe');
      res.redirect('/users/signup');
    }
    var newUser = new User({name, email, password});
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash('success_msg', 'Usuario creado');
    res.redirect('/users/login');
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/users/login');
});

module.exports = router;
