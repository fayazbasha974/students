var express = require('express');
var router = express.Router();
var controller = require('../controllers/register');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json("hai")
});

router.post('/login', function(req, res, next) {
  controller.loginUser(req,res);
});

router.post('/forgotpassword', function(req,res,next) {
  controller.forgotPassword(req,res);
});

router.post('/changepassword', function(req,res,next) {
  controller.changePassword(req,res);
});

router.post('/resetpassword', function(req,res,next) {
  controller.resetPassword(req,res);
});
//logout functionality
router.post('/logout', function(req,res,next) {
  controller.logoutuser(req,res);
});

module.exports = router;
