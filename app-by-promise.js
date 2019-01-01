const yargs = require('yargs');
const axios = require('axios');

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
var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=FWQcWRKAnhPCI2egavnMvrEEbpQ0RmAg&location=${encodedAddress}`;
axios(geocodeUrl)
.then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address.');
    }
    console.log(response.data.results[0].locations[0].latLng.lng);
    var lat = response.data.results[0].locations[0].latLng.lat;
    var lng = response.data.results[0].locations[0].latLng.lng;
    var weatherUrl = `https://api.darksky.net/forecast/1860dba77ac62242f3e468c0a0d931b4/${lat},${lng}`;
    console.log(response.data.results[0].providedLocation.location);
    return axios.get(weatherUrl);
})
.then((response) => {

    var FtoC = (degrees) => {
        return Math.round((degrees-32)*50/9)/10;
    };
    
    var temperature = FtoC(response.data.currently.temperature);
    var apparentTemperature = FtoC(response.data.currently.apparentTemperature);
    console.log(`It's currently ${temperature}\xB0C. It feels like ${apparentTemperature}\xB0C.`);    
})
.catch((e) => {
    if (e.code === 'ENOTFOUND') {
      console.log('Unable to connect to API servers.');
    } else {
      console.log(e.message);
    }
});


