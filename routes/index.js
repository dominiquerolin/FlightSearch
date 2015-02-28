var express = require('express'),
fs = require('fs'),
lookup = require('../modules/lookup');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		'reqstring': JSON.stringify(req.body)
	});

});

router.post('/', function(req,res){
	lookup(req.body, function(err, results){
		if(err) throw err;
		res.render('results', results);
	});
});
module.exports = router;
