const mongoose = require('mongoose');
const { Schema } = mongoose;

const TicketSchema = new Schema({
  title: {type: String, required: true},
  type: {type: String, required: true},
  description: {type: String},
  creation_date: {type: Date, default: Date.now},
  write_date: {type: Date, default: Date.now},
  user: {type: String} 
});

module.exports = mongoose.model('Ticket', TicketSchema)
