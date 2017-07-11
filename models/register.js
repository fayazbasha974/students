var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var address = require('../customdatatypes/datatypes');
var Address = address.address;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var database = require('../database/database');
var db = mongoose.connect(database.database);
//on connection mongoose
mongoose.connection.on('connected', function() {
    console.log('Database connected successfully ' +database.database);
});

mongoose.connection.on('error', function(err) {
  console.log('Database not connected ' +err);
});
var  autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(db);

var newuser = mongoose.Schema({
  title:  String,
  firstname: String,
  middlename: String,
  lastname: String,
  dob: Date,
  gender: String,
  nationality: String,
  countryOfBirth: String,
  countryOfResidence: String,
  programOfInterest: String,
  preferredStartDate: String,
  emailId: String,
  password: String,
  programs: String,
  phonenumber: String,
  passportNumber : String,
  passportValidUntil : Date,
  visaRequired : Boolean,
  transportationRequired : Boolean,
  accommodationRequired : Boolean,
  hash : String,
  salt : String,
  addressForCorrespondence : Address,
  permanentAddress : Address,
  otp : Number
});

var application = mongoose.Schema({
  applicationId: {type: Number, unique: true},
  title:  String,
  firstname: String,
  middlename: String,
  lastname: String,
  dob: Date,
  gender: String,
  nationality: String,
  countryOfBirth: String,
  countryOfResidence: String,
  programOfInterest: String,
  preferredStartDate: String,
  programs: String,
  phonenumber: String,
  passportNumber : String,
  passportValidUntil : Date,
  visaRequired : Boolean,
  transportationRequired : Boolean,
  accommodationRequired : Boolean,
  hash : String,
  salt : String,
  addressForCorrespondence : Address,
  permanentAddress : Address,
  edImage:String,
  engProfImage:String
});

application.plugin(autoIncrement.plugin, {
    model: 'applications',
    field: 'applicationId',
    startAt: 1111,
    incrementBy: 1
});

newuser.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
} 

newuser.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

newuser.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id : this._id,
    email : this.email,
    name : this.name,    
    username : this.username,
    exp : parseInt(expiry.getTime()/ 1000),
  }, "mysecretkey");
}

var registerschema = mongoose.model("apps",newuser);
var applicationSchema = mongoose.model("applications",application);

module.exports = {registerschema, applicationSchema};