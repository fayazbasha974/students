var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var crypto = require('crypto'); 

var signup = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  hash: String,
  salt: String,
  country : String,
  program : String,
  phone : Number
});

signup.method.setPassword = function(password) {
  console.log("set password");
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
} 

var signupSchema = mongoose.model("signups",signup);
module.exports = signupSchema;