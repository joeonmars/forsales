const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  gender: String,
  email: String,
  login_id: String,
  login_type: String,
  custom_photo: String,
  avatar: String,
});


const User = mongoose.model('User', UserSchema);

module.exports = User;
