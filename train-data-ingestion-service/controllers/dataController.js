const axios = require("axios");
const { processAndSaveData } = require("../services/dataProcessing");
const TrainLocation = require("../models/trainLocationModel");

const processData = async (req, res) => {
  try {
    const data = req.body;

    const processedData = await processAndSaveData(data);

    // Send the processed data to another microservice
    await axios.post(process.env.MICROSERVICE_URL, processedData);

    res.status(200).send({ message: "Data processed and sent successfully" });
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//  get all trains location data
const getAllTrainGpsData = async (req, res) => {
  try {
    const trainLocationData = await TrainLocation.find();
    res.status(200).json({
      data: trainLocationData,
    });
  } catch (err) {
    console.error("Error in getAllTrainData controller:", err);
    res.status(500).json({ error: "Failed to retrieve train location data" });
  }
};

module.exports = { processData, getAllTrainGpsData };
