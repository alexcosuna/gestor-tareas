var express = require('express');
var router = express.Router();
const {isAuthenticated} = require('../helpers/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.redirect('/tickets')
});

module.exports = router;
