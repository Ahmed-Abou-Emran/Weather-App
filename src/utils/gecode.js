const request = require("request");
const geocode = (address, callback) => {
  const url = `http://api.positionstack.com/v1/forward?access_key=72976e4a0c110c1ff916a41a2e7e730d&query=${encodeURIComponent(
    address
  )}`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to positionstack!", undefined);
    } else if (response.body.error || !response.body.data.length) {
      callback(`Unable to find the location!`, undefined);
    } else {
      const latitude = response.body.data[0].latitude;
      const longitude = response.body.data[0].longitude;
      const location = `${response.body.data[0].name}, ${response.body.data[0].country}:`;
      callback(undefined, { longitude, latitude, location });
    }
  });
};

module.exports = geocode;
