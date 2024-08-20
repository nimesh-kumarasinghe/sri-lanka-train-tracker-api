const { connectToDatabase } = require("../config/db-config");
const { reverseGeocode } = require("./reverseGeocoding");

async function processAndSaveData(data) {
  const db = await connectToDatabase();
  const collection = db.collection("trainLocationData");

  // Apply reverse geocoding
  const locationName = await reverseGeocode(
    data.location.latitude,
    data.location.longitude,
    data.speed
  );

  // Format the data
  const processedData = {
    ...data,
    locationName,
  };

  // Save data to MongoDB
  await collection.insertOne(processedData);

  return processedData;
}

module.exports = { processAndSaveData };
