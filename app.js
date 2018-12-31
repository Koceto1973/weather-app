const yargs = require('yargs');

const geocode = require('./geocode/geocode');

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
      console.log(result.address);
      console.log(result.latitude);
      console.log(result.longitude);      
    }
  });

