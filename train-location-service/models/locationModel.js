const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  iotDeviceId: {
    type: String,
    required: true,
    unique: true,
  },
  trainId: String,
  tripId: Number,
  tripType: String,
  startTime: Date,
  endTime: Date,
  routeId: Number,
  startStation: String,
  endStation: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  location: {
    latitude: Number,
    longitude: Number,
  },
  speed: Number,
  signalStrength: Number,
});

const Location = mongoose.model("Location", LocationSchema);
module.exports = Location;
