/**
 * This class makes HTTP requests to Underground weather API
 * and parses the response received
 */
var http = require('http'),
    base_url = "http://api.wunderground.com/api/281f68076d825a6f/conditions/q/";
exports.read = function(location, callback) {
	var weather_api_url = base_url + location +".json",
	   parseResponse = function (body, callback) {
           if(undefined !== body) {
        	   var parsedBody = JSON.parse(body),
        	       parsedJSON = parsedBody.current_observation,
        	       result = {};
        	   	   result.location = undefined !== parsedJSON.display_location ? parsedJSON.display_location.full : '';
        	       result.temperature = parsedJSON.temp_c;
        	       result.feels_like = parsedJSON.feelslike_c;
        	       result.weather = parsedJSON.weather;
        	       result.icon_url = parsedJSON.icon_url;
        	       result.icon = parsedJSON.icon;
        	       console.log('Response successfully parsed for location: ' + location)
        	       callback(result, null);
           } else {
        	   console.log('API response undefined for location: ' + location)
        	   callback(null,'Undefined response');
           }
	   };
	   console.log('Calling api: {' + weather_api_url + '}');
	  request = http.request(weather_api_url, function(response) {
		var body = "";
		response.on('data', function (chunk) {
		    body += chunk;
		});
		response.on('end', function() {
			parseResponse(body, callback);	
		});
	  });
	  request.end();
}