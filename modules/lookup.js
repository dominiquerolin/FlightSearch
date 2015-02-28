/*
 * Sends a lookup request for each leg of the trip and combines them in case of a return trip
 */
module.exports = function(req, callback) {
	var searchFlights = require('./searchFlights');
	
	// retrieve outbound flights
	searchFlights(req.from,req.to,req.date_from, function(err, flights_from) {
		if(err) throw err;
		if(req.return_trip==0) {
			callback(null, flights_from);
		} 
		else {
			// retrieve return flights
			searchFlights(req.to,req.from,req.date_back, function(err, flights_back) {
				if(err) throw err;
				
				var flights=[];
				// combine every outbound flight with every return flight occurring after arrival
				flights_from.forEach(function(ff) {
					flights_back.forEach(function(fb) {
						if(new Date(fb.departure) > new Date(ff.arrival) ) {
							var combined = {'from':ff, 'back':fb};
							combined.price = combined.from.price + combined.back.price;
							flights.push(combined);
						}
					});
					
				});
				
				callback(null, flights);
			});
		}
	});
}