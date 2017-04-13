var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var signup = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  confirmPassword: String,
  country : String,
  program : String,
  phone : Number
});

signup.methods.setPassword = function(password) {
  res.json("hai sa")
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
} 

var signupSchema = mongoose.model("signups",signup);
module.exports = signupSchema;