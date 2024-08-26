// const { connectToDatabase } = require("../config/db-config");
// const { reverseGeocode } = require("./reverseGeocoding");

// async function processAndSaveData(data) {
//   const db = await connectToDatabase();
//   const collection = db.collection("trainLocationData");

//   // Apply reverse geocoding
//   const locationName = await reverseGeocode(
//     data.location.latitude,
//     data.location.longitude,
//     data.speed
//   );

//   // Format the data
//   const processedData = {
//     ...data,
//     locationName,
//   };

//   // Save data to MongoDB
//   await collection.insertOne(processedData);

//   return processedData;
// }

// module.exports = { processAndSaveData };

const mongoose = require("mongoose");
const TrainLocation = require("../models/trainLocationModel");
const { reverseGeocode } = require("./reverseGeocoding");

async function processAndSaveData(data) {
  // Apply reverse geocoding
  const locationName = await reverseGeocode(
    data.location.latitude,
    data.location.longitude,
    data.speed
  );

  // Format the data and create a new instance of TrainLocation
  const processedData = new TrainLocation({
    iotDeviceId: data.iotDeviceId,
    location: data.location,
    speed: data.speed,
    timestamp: data.timestamp,
    signalStrength: data.signalStrength,
    locationName,
  });

  // Save data to MongoDB using Mongoose
  await processedData.save();

  return processedData;
}

module.exports = { processAndSaveData };
