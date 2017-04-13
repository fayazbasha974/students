var bodyParser = require('body-parser');
var userdetails = require('../models/register');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

exports.insertUser = function(req, res){
    var user = new userdetails({
        firstname: req.body.firstname,
        lastname:   req.body.lastname,
        emailId: req.body.emailId,
        countryOfResidence: req.body.countryOfResidence,
        programs: req.body.programs,
        phonenumber: req.body.phonenumber
    });
   userdetails.find({emailId: req.body.emailId}, function(err,docs) { 
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
    userdetails.findOne({emailId: req.body.emailId}, function(err, docs) {
        if (err) throw err;
        else {
            if(docs != null) {
                var hash = docs.validPassword(req.body.password);
                if(hash == true) {
                    var token = docs.generateJwt();
                    res.json({ success : true, msg : 'User Logged in Successfully', code : 1, token : token})
                } else {
                    res.json({ success : false, msg : 'Password incorrect', code : 1})
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
                        clientId:'981378050453-d9qvnja1ai882jqjqhgiuulfb6h1q0hi.apps.googleusercontent.com', 
                        clientSecret:'jJWSuaKE6Wqhf1jz9Zw9rkiv', 
                        refreshToken:'1/G4XELGyX2sKvmZuTStVfjoLt3a5l27QqXWSaJKMvTyk', 
                        accessToken:'ya29.GlsqBOCn39Djr6F9CbEGXkRCnWUqx_osQY9N8FTPT4hvQmWb17j0TnxEIlDgQPW81aO8fKbgszXLnzO-IidQ0DREdaUSNJHql5BLH3zDheGT-wUpW5ZkLGATyxnh'
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
                    var np = docs.setPassword(req.body.updatepassword);
                    userdetails.update({emailId: req.body.emailId}, {$set: {hash: np}}, function(err, data) {
                        if(err) throw err;
                        else {
                            res.json('updated password '+ data[0]);
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