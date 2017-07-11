var bodyParser = require('body-parser');
var userdetails = require('../models/register').registerschema;
var applications = require('../models/register').applicationSchema;
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

exports.insertUser = function(req, res){
    var user = new userdetails({
        firstname: req.body.firstName,
        lastname:   req.body.lastName,
        emailId: req.body.email,
        countryOfResidence: req.body.country,
        programs: req.body.program,
        phonenumber: req.body.phone
    });
   userdetails.find({emailId: req.body.email}, function(err,docs) { 
       if(err) throw err;
       if (docs[0] != null) {
           res.json({ success : false, msg :'Email ID already exists ', code : 0})
       }
       else {
           user.setPassword(req.body.password);
           user.save(function(err,data) {
               if(err) throw err;
               res.json({ success : true, msg : 'User Registered Successfully', code : 1});
           });
       }
    });
    
}

exports.insertApplication = function(req, res){
    var application = new applications({
        title : req.body.title,
        firstname: req.body.fullname,
        middlename: req.body.title,
        lastname: req.body.lastname,
        dob: req.body.dateofbirth,
        gender: req.body.gender,
        nationality: req.body.nationality,
        countryOfBirth: req.body.countryofbirth,
        countryOfResidence: req.body.country,
        programOfInterest: req.body.title,
        preferredStartDate: req.body.title,
        emailId: req.body.title,
        password: req.body.title,
        programs: req.body.title,
        phonenumber: req.body.title,
        passportNumber : req.body.passport,
        passportValidUntil : req.body.passportvalidtill,
        visaRequired : req.body.visa,
        transportationRequired : req.body.transport,
        accommodationRequired : req.body.title,
        hash : req.body.title,
        salt : req.body.title,
        addressForCorrespondence : req.body.address,
        permanentAddress : req.body.title,
        otp : req.body.title,
        edImage : req.body.edImage,
        engProfImage : req.body.engProfImage
    });
    console.log(req.body.engProfImage);
    application.save(function(err,data) {
       if(err) throw err;
       res.json({ success : true, msg : 'application Registered Successfully', code : 1});
    });
   /*applications.find({emailId: req.body.email}, function(err,docs) { 
       if(err) throw err;
       if (docs[0] != null) {
           res.json({ success : false, msg :'Email ID already exists ', code : 0})
       }
       else {
        //    user.setPassword(req.body.password);
           application.save(function(err,data) {
               if(err) throw err;
               res.json({ success : true, msg : 'User Registered Successfully', code : 1});
           });
       }
    });*/
    
}
//fetch all applications
exports.fetchApplications = function(req, res){
    applications.find({}, function(err, docs){
        if(err) throw err;
        else if(docs.length){
            res.json(docs);
        }
    })
}

// user logout functionality
exports.logoutuser = function(req,res,next){
    res.json({msg:'user logged out Successfully', code:1});
}
// end of user logout functionality

// user login 
exports.loginUser = function(req,res) {
    userdetails.findOne({emailId: req.body.email}, function(err, docs) {
        if (err) throw err;
        else {
            if(docs != null) {
                var hash = docs.validPassword(req.body.password);
                if(hash == true) {
                    var token = docs.generateJwt();
                    res.json({ success : true, msg : 'User Logged in Successfully', code : 1, token : token,data : docs})
                } else {
                    res.json({ success : false, msg : 'Password incorrect', code : 2})
                }
            } else {
                res.json({ success: false, msg : 'Emaild ID Incorrect', code : 0});
            }
        }
    });
}

// forgot password
exports.forgotPassword = function(req,res) {
    userdetails.findOne({emailId: req.body.email}, function(err, docs) {
        if (err) throw err;
        else {
            if(docs != null) {
                var otp = Math.floor(Math.random() * 200000);
                console.log(otp);
                userdetails.update({emailId: req.body.email}, {$set: {otp: otp}}, function(err, data) {
                    if(err) throw err;
                    else {
                        res.json({success : true, msg : 'Mail sent', code : 1});
                    var transporter = nodemailer.createTransport({
                        service:'gmail', 
                        auth: {
                            type:'OAuth2', 
                            user:'vinaykumar0459@gmail.com', 
                            clientId:'981378050453-0kmrf8v53pnfda00e0mllmksnnsu7a7q.apps.googleusercontent.com', 
                            clientSecret:'o2YiqEtCmLaDr_O7Czvl4PJF', 
                            refreshToken:'1/i3gjKgMdnT97lM3vziLbautNVKEB2zdjYqzPzIakJkUAM6-H_oixTJlQxcUCg0Nq', 
                            accessToken:'ya29.GlssBBt4aCMk2ae7kta_LCgQHKjPkFVFuYQ2VxcoYbRQlTAM8BgwXMSxRmTs0sommAxTchDE3fIY0t9jvf9KMN6s1y_f--IjqkPSziMut__C6wAoJHw3B2JiJlYX'
                        }
                        });
                        var mailOptions = {
                            from:'admin <vinaykumar0459@gmail.com>', 
                            to:req.body.email, 
                            subject:'Forgot Password', 
                            html:'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head></head><body><style></style><div class="mail-main"><h4>Hello <strong> '+req.body.email+',</strong></h4>Your OTP is : '+otp+'<br>click below link to reset your password<br><a href="#">http://localhost:3000/resetpassword</a></div><br><br>Thanks,<br><strong>IMT Dubai</strong></body></html>'
                            }
                        transporter.sendMail(mailOptions, function (err, res) {
                            if (err) {
                                console.log('Error' + err);``
                                throw err;
                            }else {
                                console.log('Email Sent'); 
                            }
                        });
                        }
                    });
            } else {
                res.json({success: false, msg : 'Email ID Incorrect', code : 0});
            }
        }
        
    });
}

exports.resetPassword = function(req,res) {
    userdetails.findOne({otp: req.body.otp}, function(err, docs) {
        if(err) throw err;
        else {
            if(docs != null) {
                docs.setPassword(req.body.resetpassword);
                docs.save(function(err,data) {
                    if(err) throw err;
                    else {
                        res.json({ success: true, msg: 'Password Updated Successfully', code : 1});
                    }
                });
            } else {
                res.json({ success: false, msg: 'OTP is incorrect', code : 0});
            }
        }
    });
}
// change password
exports.changePassword = function(req,res) {
    userdetails.findOne({emailId: req.body.emailId}, function(err, docs) {
        if(err) throw err;
        else {
            if(docs != null) {
                var hash = docs.validPassword(req.body.password);
                if(hash == true) {
                    docs.setPassword(req.body.updatepassword);
                    docs.save(function(err,data){
                        if(err) throw err;
                        else {
                            res.json({success: true, msg : 'Password Updated Successfully', code : 1});
                        }
                    });
                } else {
                    res.json({ success: false, msg: 'Password Incorect', code : 2});
                }
            } else {
                res.json({ success: false, msg: 'Email ID Incorrect', code : 0})
            }
        }
    })
}