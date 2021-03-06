const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

  geocode.geocodeAddress(argv.address, (errorMessage, result) => {
    if (errorMessage) {
      console.log(errorMessage);
    } else {
      weather.getWeather(result.latitude,result.longitude,(errorMessage, weatherResults) => {
        if (errorMessage) {
          console.log(errorMessage);
        } else {
          console.log(`It's currently ${weatherResults.temperature}\xB0C. It feels like ${weatherResults.apparentTemperature}\xB0C.`);
        }
      });     
    }
  });


