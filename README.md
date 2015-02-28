# Flight Search Engine
A node app using the Express framework, Jade templating engine, and jQuery (datePicker, Slider).
Hosted on Heroku at https://drn-flightsearch.herokuapp.com/

## Personal contributions
The Express framework comes with its own built-in structure, thus I am not to be credited for all the files in the repository. Below is a list of noteworthy files.

### back-end
`/bin/randomFlightGenerator.js`
I wrote this to generate a list of flights. The resulting JSON has been committed to the repo but you can run this file standalone to test it.

`/modules/*`
The logic for the search engine. lookup.js is the wrapper that serves the formatted results after searchFlights has been called.

`/routes/index.js`
minor routing

### front-end
`/views/*`
all templating is my own
	
`/public/stylesheets/style.css`
is adapted from a free template found at http://www.free-css.com/free-css-templates/page11/g-consultant#shout
	
`/public/javascripts/form.js`
The logic for user interaction on the form. Contains a mix of jQuery and native JS.
	
