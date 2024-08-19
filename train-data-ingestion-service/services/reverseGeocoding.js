const axios = require("axios");

const REVERSE_GEOCODING_API_URL = "https://nominatim.openstreetmap.org/reverse";
const FORMAT = "json";

async function reverseGeocode(latitude, longitude, speed) {
  try {
    const response = await axios.get(REVERSE_GEOCODING_API_URL, {
      params: {
        lat: latitude,
        lon: longitude,
        format: FORMAT,
      },
    });

    const address = response.data.address;

    if (speed === 0) {
      return (
        address.railway ||
        address.suburb ||
        address.quarter ||
        address.village ||
        address.town
      );
    } else {
      return (
        address.village ||
        address.road ||
        address.neighbourhood ||
        address.town ||
        address.quarter ||
        address.suburb ||
        address.city
      );
    }
  } catch (error) {
    console.error("Error in reverse geocoding:", error);
    return "Unknown location";
  }
}

module.exports = { reverseGeocode };
