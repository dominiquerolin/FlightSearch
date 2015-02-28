var express = require('express'),
router = express.Router(),
fs = require('fs'),
lookup = require('../modules/lookup'),
getPriceBoundaries = require('../modules/price');


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		'reqstring': JSON.stringify(req.body)
	});
});

router.post('/', function(req,res){
	lookup(req.body, function(err, flights){
		if(err) throw err;
		getPriceBoundaries(flights, function(err, bounds){
			if(err) throw err;
			res.render('results', {
				'req': req.body,
				'reqstring': JSON.stringify(req.body),
				'flights': flights,
				'min_price': bounds[0],
				'max_price': bounds[1]
			});
		});
	});
});
module.exports = router;
