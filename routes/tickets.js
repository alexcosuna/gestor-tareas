var express = require('express');
var router = express.Router();
const Ticket = require('../models/Ticket');
const {isAuthenticated} = require('../helpers/auth');

router.get('/add', isAuthenticated, function(req, res, next) {
  res.render('tickets/new-ticket');
});

router.post('/new-ticket', isAuthenticated, async function(req, res, next){
  var {title, type, description} = req.body;
  var errors = [];
  if(!title){
    errors.push({text: 'Porfavor rellene el titulo'})
  }
  if(!type){
    errors.push({text: 'Porfavor rellene el tipo'})
  }
  if(errors.length > 0){
    res.render('tickets/new-ticket', {
      errors,
      title,
      description
    })
  } else {
    var newTicket = new Ticket({title, type, description});
    newTicket.user = req.user.id;
    await newTicket.save();
    req.flash('success_msg', 'Ticket creado');
    res.redirect('/tickets');
  }
});

router.get('/', isAuthenticated, async function(req, res, next) {
  const tickets = await Ticket.find({user: req.user.id}).sort({create_date: 'asc'});
  res.render('tickets/all-tickets', { tickets });
});

router.get('/edit/:id', isAuthenticated, async function(req, res, next){
  var ticket = await Ticket.findById(req.params.id);
  res.render('tickets/edit-ticket', {ticket});
});

router.post('/edit-ticket/:id', isAuthenticated, async function(req, res, next){
  var {title, type, description} = req.body;
  var write_date = Date.now();
  await Ticket.findByIdAndUpdate(req.params.id, {title, type, description, write_date});
  req.flash('success_msg', 'Ticket actualizado');
  res.redirect('/tickets');
});

router.post('/delete/:id', isAuthenticated, async function(req, res, next){
  await Ticket.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Ticket eliminado');
  res.redirect('/tickets');
});

module.exports = router;
