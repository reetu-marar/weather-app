/**
 * This class iterates over all locations, makes asynchronous 
 * calls to weather client to fetch weather information for each of the location
 * and renders the data when all calls are finished
 */
var http = require('http'),
	async = require('async'),
    weatherClient = require('../rest/weather-client.js'),
    locations = ['CA/Campbell', 'NE/Omaha', 'TX/Austin','MD/Timonium'];
exports.handler = function(req, res) {
	var results = [];
	async.forEach(locations, function(location, callback) {
		weatherClient.read(location, function(response, error) {
			if(response && !error) {
				results.push(response);	
				if(results.length == locations.length) {
					res.render('weather', {'results': results});
				}
			} else {
				callback(error);
			}
		});
		callback();
	},
	function(err) {
		if(err) {
			console.log('Error occurred: ' + err);
		}
	});
};