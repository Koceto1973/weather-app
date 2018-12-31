const request = require('request');

var geocodeAddress = (address,callback) => {
  var encodedAddress = encodeURIComponent(address);
  request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=FWQcWRKAnhPCI2egavnMvrEEbpQ0RmAg&location=${encodedAddress}`,
    json: true  // convert to json directly, but clipped, not pretty
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to MapQuest servers.',null);
    } else if (body.info.statuscode !== 0) {
      callback('Unable to find such address.',null);
    } else if (body.info.statuscode === 0) {
      callback(null,{
        address: body.results[0].providedLocation.location,
        latitude: body.results[0].locations[0].latLng.lat,
        longitude: body.results[0].locations[0].latLng.lng
      })
    }
  });
}

module.exports.geocodeAddress = geocodeAddress;

