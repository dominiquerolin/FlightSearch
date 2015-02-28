/*
 * Walks through the flight JSON to find matches
 */
module.exports = function(from, to, date, callback) {
	var fs = require('fs'), moment = require('moment');
	var flights = JSON.parse(fs.readFileSync('./public/javascripts/flights.json','utf-8'));
	var filtered = [];
	flights.forEach(function(f){
		if(f.from == from && f.to == to && moment(f.departure).isSame(date, 'day')) {
			// split date/time for easier display
			f.departure_date = f.departure.split(' ')[0];
			f.departure_time = f.departure.split(' ')[1];
			f.arrival_date = f.arrival.split(' ')[0];
			f.arrival_time = f.arrival.split(' ')[1];
			filtered.push(f);
		}
	});
	// order by date asc
	filtered.sort(function(a,b) {
		var aDate = new Date(a.departure);
		var bDate = new Date(b.departure);
		return aDate > bDate; 
	});
	callback(null, filtered);
}
