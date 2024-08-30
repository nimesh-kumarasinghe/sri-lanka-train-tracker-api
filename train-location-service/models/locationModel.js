const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  iotDeviceId: {
    type: Number,
    unique: true,
  },
  location: {
    latitude: Number,
    longitude: Number,
  },
  speed: Number,
  timestamp: Date,
  signalStrength: Number,
  locationName: String,

  tripId: Number,
  trainName: String,
  startStationName: String,
  endStationName: String,
  tripType: String,
  duration: String,
  availability: String,
  startTime: String,
  endTime: String,
  stations: [
    {
      stationName: String,
      latitude: Number,
      longitude: Number,
      arrivalTime: String,
      departureTime: String,
    },
  ],
});

const Location = mongoose.model("Location", LocationSchema);
module.exports = Location;
