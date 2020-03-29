const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/20789cb14c205b66b94a49fb05d74ac7/" +
    encodeURIComponent(latitude) +
    "," +
    longitude;

  request(
    {
      url,
      json: true
    },
    (error, { body }) => {
      if (error) {
        callback("Unable to reach server.");
      } else if (body.error) {
        callback("Error in the coordinates entered.");
      } else {
        const { summary } = body.daily.data[0];
        const { temperature, precipProbability } = body.currently;

        callback(
          undefined,
          summary +
            " It is currently " +
            temperature +
            " degrees out. There is a " +
            precipProbability +
            "% chance of rain. "
        );
      }
    }
  );
};

module.exports = forecast;
