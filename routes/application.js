var express = require('express');
var router = express.Router();
var controller = require('../controllers/register');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json("hai")
});

router.post('/', function(req, res, next){
    // res.json(req.body);
    controller.insertApplication(req,res);
})

module.exports = router;
