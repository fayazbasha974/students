var bodyParser = require('body-parser');
var userdetails = require('../models/register');
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

// user login 
exports.loginUser = function(req,res) {
    userdetails.findOne({emailId: req.body.email}, function(err, docs) {
        if (err) throw err;
        else {
            if(docs != null) {
                var hash = docs.validPassword(req.body.password);
                if(hash == true) {
                    var token = docs.generateJwt();
                    res.json({ success : true, msg : 'User Logged in Successfully', code : 1, token : token})
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
    userdetails.findOne({emailId: req.body.emailId}, function(err, docs) {
        if (err) throw err;
        else {
            if(docs != null) {
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
                        to:req.body.emailId, 
                        subject:'Forgot Password', 
                        html:'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head></head><body><style></style>Dear User, forgot password text<a href="http://192.168.150.108:4200" style="color:#00f">Login</a></body></html>'
                        }
                    transporter.sendMail(mailOptions, function (err, res) {
                        if (err) {
                            console.log('Error' + err);``
                            throw err;
                        }else {
                            console.log('Email Sent'); 
                        }
                    });
            } else {
                res.json({success: false, msg : 'Email ID Incorrect', code : 0});
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