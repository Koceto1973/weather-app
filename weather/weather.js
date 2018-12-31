const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/1860dba77ac62242f3e468c0a0d931b4/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Forecast.io server.', null);
    } else if (response.statusCode === 400) {
      callback('Unable to fetch weather.', null);
    } else if (response.statusCode === 200) {
      callback(null, {
        temperature: FtoC(body.currently.temperature),
        apparentTemperature: FtoC(body.currently.apparentTemperature)
      });
    }
  });
};

var FtoC = (degrees) => {
  return Math.round((degrees-32)*50/9)/10;
};

module.exports.getWeather = getWeather;