var express = require('express');
var router = express.Router();
var register = require('../controllers/register');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json("hai")
});

router.post('/register', function(req, res, next) {
  register.insertUser(req,res);
});

router.post('/login', function(req, res, next) {
  register.loginUser(req,res);
});

router.post('/forgotpassword', function(req,res,next) {
  register.forgotPassword(req,res);
});

router.post('/changepassword', function(req,res,next) {
  register.changePassword(req,res);
});

module.exports = router;
