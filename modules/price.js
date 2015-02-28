module.exports = function(flights, callback) {
	var min_price = null,
		max_price = null;
	flights.forEach(function(f){
		if(!min_price || min_price>f.price) min_price=f.price;
		if(!max_price || max_price<f.price) max_price=f.price;
	});
	callback(null, [min_price,max_price]);
}