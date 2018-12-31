const request = require('request');
const yargs = require('yargs');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

  var encodedAddress = encodeURIComponent(argv.address);

request({
  // https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia  // over query limit
  url: `http://www.mapquestapi.com/geocoding/v1/address?key=FWQcWRKAnhPCI2egavnMvrEEbpQ0RmAg&location=${encodedAddress}`,
  json: true  // convert to json directly, but clipped, not pretty
}, (error, response, body) => {
  console.log(`Address: ${body.results[0].providedLocation.location}`);
  console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
  console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`);
});