module.exports = function(req, callback) {
	var searchFlights = require('./searchFlights');
	var payload= {
			'req': req,
			'reqstring': JSON.stringify(req),
			'flights': [],
            'min_price': null,
            'max_price': null
		};

	searchFlights(req.from,req.to,req.date_from, function(err, flights_from) {
		if(err) throw err;
		if(req.return_trip==0) {
			console.log('one way');
			payload.flights = flights_from;
			flights_from.forEach(function(f){
	            if(!payload.min_price || f.price<payload.min_price) payload.min_price = f.price;
	            if(!payload.max_price || f.price>payload.max_price) payload.max_price = f.price;
			})
			callback(null, payload);
		} else {
			console.log('return');
			searchFlights(req.to,req.from,req.date_back, function(err, flights_back) {
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
				
				callback(null, payload);
			});
		}
	});
}