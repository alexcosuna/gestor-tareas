const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  creation_date: {type: Date, default: Date.now},
  write_date: {type: Date, default: Date.now}
});

UserSchema.methods.encryptPassword = async (password) => {
  var salt = await bcrypt.genSalt(10);
  var hash = bcrypt.hash(password, salt);
  return hash;
};

UserSchema.methods.matchPassword = async function(password){
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema)
