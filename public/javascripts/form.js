function initForm() {
	$(function() {
		initDatePicker();
		if ($("#price_slider").length == 1) {
			initPriceSlider(parseInt($("#min_price").html()), parseInt($("#max_price").html()));
		}
		if($("#return_trip_1").is(":checked")) {
			$('#date_back').show();
			$('#l_date_back').show();
		} else {
			$('#date_back').hide();
			$('#l_date_back').hide();
		}
	});

}
/**
 * Destination selector
 */
function updateDest() {
	var from = document.getElementById('from');
	var to = document.getElementById('to');
	while (to.hasChildNodes() == true) { // clear options
		to.removeChild(to.childNodes[0]);
	}
	for (i = 0; i < from.options.length; i++) { // add remaining airports
		if (from.selectedIndex != i)
			to.add(new Option(from.options[i].label, from.options[i].value));
	}
	to.disabled = false;
}

/**
 * Date picker init
 */
function initDatePicker() {
	var options = {
		defaultDate : "+1d",
		minDate : "+1d",
		maxDate : "+90d",
		dateFormat : "yy-mm-dd",
		constrainInput : true,

	};
	$("#date_from").datepicker(options);
	$("#date_from").datepicker("option", {
		onClose : updateReturnDate
	});
	$("#date_back").datepicker(options);
	if ($("#date_from").val() != '')
		updateReturnDate();

}
function updateReturnDate() {
	var selected = $("#date_from").datepicker("getDate");
	if (selected != null)
		$("#date_back").datepicker("option", {
			minDate : new Date(selected)
		});
}

/**
 * Price slider init integer minPrice integer maxPrice
 */
function initPriceSlider(minPrice, maxPrice) {

	$("#slider").slider({
		min : minPrice,
		max : maxPrice,
		range : true,
		values : [ minPrice, maxPrice ],
		change : function(event, ui) {
			$("#min_price").html(ui.values[0]);
			$("#max_price").html(ui.values[1]);
			filterResults(ui.values[0], ui.values[1]);
		}
	});

}

function filterResults(minPrice, maxPrice) {
	$("div.row").each(function(i) {
		var price = parseInt(this.className.replace("row", ""));
		if (price <= maxPrice && price >= minPrice)
			$(this).show();
		else
			$(this).hide();
	});
}

/**
 * Form Validation object frm the html form
 */
function validateForm(frm) {
	var now = new Date();
	if (frm.from.value == '') {
		alertUser('Please select a departure location.');
	} else if (frm.to.value == '') {
		alertUser('Please select a destination.');
	} else if (frm.date_from.value == '') {
		alertUser('Please select a departure date');
	} else if ((/^\d{4}-\d{2}-\d{2}$/).test(frm.date_from.value) == false) {
		alertUser('Please input a valid departure date');
	} else if (frm.return_trip.checked) {
		if (frm.date_back.value == '') {
			alertUser('Please select a return date');
		} else if (frm.return_trip.checked
				&& (/^\d{4}-\d{2}-\d{2}$/).test(frm.date_back.value) == false) {
			alertUser('Please input a valid return date');
		} else if (new Date(frm.date_from.value) < now) {
			alertUser('Departure date cannot be in the past');
		} else if (new Date(frm.date_from.value) > new Date(frm.date_back.value)) {
			alertUser('Departure date cannot occur after return date');
		} else
			frm.submit();
	} else
		frm.submit();
}
function alertUser(msg) {
	alert(msg);
}