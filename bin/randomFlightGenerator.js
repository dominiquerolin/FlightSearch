/*
 * Generates 3 flights per route (city A -> city B) per day, for the next 90 days
 * Time, duration and price of flights are random
 */


function roundedRand(min, max) {
	return Math.floor(Math.random()*(max-min)) + min;
}
function getFlightNum() {
	return String.fromCharCode(roundedRand(65,91))+String.fromCharCode(roundedRand(65,91))+'-'+roundedRand(100,999);
}

var fs = require("fs"),
    airports = {"SYD":"Sydney","MEL":"Melbourne","BNE":"Brisbane","PER":"Perth","ADL":"Adelaide","HBA":"Hobart","DRW":"Darwin"},
    flights = [],
    dailyFlightsPerRoute = 3,
    maxDaysAhead = 90;

Object.keys(airports).forEach(function(from) {
	Object.keys(airports).forEach(function(to) {
		if(from!=to) {
			var i = 0;
			var departure = new Date();
			while(i<maxDaysAhead) {
				var j=0;
				departure.setDate(departure.getDate()+1);
				while (j<dailyFlightsPerRoute) {
					departure.setHours(roundedRand(0,23));
					departure.setMinutes(roundedRand(0,59));
					arrival = new Date(departure);
					arrival.setHours(departure.getHours() + roundedRand(1,4));
					arrival.setMinutes(departure.getMinutes() + roundedRand(0,59));

					flights.push({
						"from": from,
						"to": to,
						"number": getFlightNum(),
						"departure": departure.toISOString().substr(0,16).replace('T',' '),
						"arrival": arrival.toISOString().substr(0,16).replace('T',' '),
						"price": roundedRand(300, 1500)
					});
					j++;
				}
				i++;
			}
		}
	})
})
fs.writeFile("../public/javascripts/flights.json", JSON.stringify(flights), function(err){
	if(err) throw err;
})