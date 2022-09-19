const request = require("request");

// request({ url: url, json: true }, (error, response) => {});

const forecast = (longitude, lattiude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=de9dc8ac0771363542f5db5c0e0b9b9b&query=${lattiude},${longitude}&units=m`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weatherstack service!", undefined);
    } else if (response.body.error) {
      callback(response.body.error.info, undefined);
    } else {
      callback(
        undefined,
        `${response.body.current.weather_descriptions[0]}: The temperatures is ${response.body.current.temperature}°C , but it feels like it is ${response.body.current.feelslike}°C. Precipitation is ${response.body.current.precip}% and Wind Speed is ${response.body.current.wind_speed}k/m`
      );
    }
  });
};

module.exports = forecast;
