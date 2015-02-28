module.exports = function(from, to, date, callback) {
	var fs = require('fs'), moment = require('moment');
	var flights = JSON.parse(fs.readFileSync('./public/javascripts/flights.json','utf-8'));
	var filtered = [];
	flights.forEach(function(f){
		if(f.from == from && f.to == to && moment(f.departure).isSame(date, 'day')) {
			f.departure_date = f.departure.split(' ')[0];
			f.departure_time = f.departure.split(' ')[1];
			f.arrival_date = f.arrival.split(' ')[0];
			f.arrival_time = f.arrival.split(' ')[1];
			f.duration = moment(f.arrival).diff(moment(f.departure), 'minutes');
			filtered.push(f);
		}
	});
	filtered.sort(function(a,b) {
		var aDate = new Date(a.date+' '+a.time);
		var bDate = new Date(b.date+' '+b.time);
		return aDate.getTime() > bDate.getTime() ? 1 : -1; 
	});
	callback(null, filtered);
}
