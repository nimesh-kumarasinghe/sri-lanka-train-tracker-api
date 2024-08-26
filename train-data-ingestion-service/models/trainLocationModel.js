const mongoose = require("mongoose");

const trainLocationSchema = new mongoose.Schema(
  {
    iotDeviceId: { type: Number, required: true },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    speed: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    signalStrength: { type: Number, required: true },
    locationName: { type: String, required: true },
  },
  { timestamps: true }
);

const TrainLocation = mongoose.model("trainLocationData", trainLocationSchema);

module.exports = TrainLocation;
