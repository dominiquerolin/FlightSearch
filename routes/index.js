var express = require('express'),
fs = require('fs'),
searchFlights = require('../node_modules/searchFlights');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		'reqstring': JSON.stringify(req.body)
	});

});

router.post('/', function(req,res){
	var payload= {
			'req': req.body,
			'reqstring': JSON.stringify(req.body),
			'flights': [],
            'min_price': null,
            'max_price': null
		};

	searchFlights(req.body.from,req.body.to,req.body.date_from, function(err, flights_from) {
		if(err) throw err;
		if(req.body.return_trip==0) {
			console.log('one way');
			payload.flights = flights_from;
			flights_from.forEach(function(f){
	            if(!payload.min_price || f.price<payload.min_price) payload.min_price = f.price;
	            if(!payload.max_price || f.price>payload.max_price) payload.max_price = f.price;
			})
			res.render('single', payload);
		} else {
			console.log('return');
			searchFlights(req.body.to,req.body.from,req.body.date_back, function(err, flights_back) {
				if(err) throw err;

				flights_from.forEach(function(ff) {
					flights_back.forEach(function(fb) {
						if(new Date(fb.departure) > new Date(ff.arrival) ) {
							var combined = {'from':ff, 'back':fb};
							combined.price = combined.from.price + combined.back.price;
				            if(!payload.min_price || combined.price<payload.min_price) payload.min_price = combined.price;
				            if(!payload.max_price || combined.price>payload.max_price) payload.max_price = combined.price;
							payload.flights.push(combined);
						}
					});
					
				});
				
				res.render('return', payload);
			});
		}
	});
});
module.exports = router;
