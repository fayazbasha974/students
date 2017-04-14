var bodyParser = require('body-parser');
var signup = require('../models/signup');

exports.signupUser = function(req, res){
  // res.json(req.body.firstName);
      var user = new signup({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          hash : '',
          salt : '',
          country : req.body.country,
          program : req.body.program,
          phone : req.body.phone
      });
      // res.json(user);
      console.log(req.body.password);
      user.setPassword(req.body.password);
      // user.save(function(err,data) {
      //   if(err) throw err;
      //   res.json({ success : true, msg : 'User Registered Successfully', code : 1});
      // });
    
}