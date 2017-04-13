var express = require('express');
var router = express.Router();
var signup = require('../controllers/signup');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json("hai")
});

router.post('/', function(req, res, next) {
	// res.json(req.body);
  signup.signupUser(req,res);
});

module.exports = router;
