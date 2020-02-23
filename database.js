const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/gestor-tickets',{
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true
}).then(db => console.log("DB IS CONNECTED"))
.catch(err => console.error(err));
