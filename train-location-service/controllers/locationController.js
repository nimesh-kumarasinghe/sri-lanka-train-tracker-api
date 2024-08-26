const locationService = require("../services/locationService");
const Location = require("../models/locationModel");

const updateLocation = async (req, res) => {
  try {
    const data = req.body;
    await locationService.updateLocationData(data);
    res.status(200).json({ message: "Location data inserted successfully" });
  } catch (err) {
    console.error("Error in updateLocation controller:", err);
    res.status(500).json({ error: "Failed to insert location data" });
  }
};

// // get all data from location collection
// const getAllTrainData = async (req, res) => {
//   try {
//     const locations = await Location.find();
//     res.status(200).json(locations);
//   } catch (err) {
//     console.error("Error in getAllLocations controller:", err);
//     res.status(500).json({ error: "Failed to retrieve location data" });
//   }
// };

const getAllTrainData = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skip = (page - 1) * limit; // Calculate how many items to skip

    const locations = await Location.find().skip(skip).limit(limit);
    const total = await Location.countDocuments(); // Get total count of documents

    res.status(200).json({
      data: locations,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Error in getAllTrainData controller:", err);
    res.status(500).json({ error: "Failed to retrieve location data" });
  }
};

// // get trains by start and end stations
// const getTrainDataByStations = async (req, res) => {
//   const { startStationName, endStationName } = req.query;

//   if (!startStationName || !endStationName) {
//     return res
//       .status(400)
//       .json({ error: "startStationName and endStationName are required" });
//   }

//   try {
//     // Query MongoDB to find documents matching the start and end station names
//     const locations = await Location.find({
//       startStationName: { $regex: new RegExp(`^${startStationName}$`, "i") },
//       endStationName: { $regex: new RegExp(`^${endStationName}$`, "i") },
//     });

//     if (locations.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No data found for the provided station names" });
//     }

//     res.status(200).json(locations);
//   } catch (err) {
//     console.error("Error in getTrainDataByStations controller:", err);
//     res.status(500).json({ error: "Failed to retrieve location data" });
//   }
// };

const getTrainDataByStations = async (req, res) => {
  const { startStationName, endStationName, page = 1, limit = 10 } = req.query;

  if (!startStationName || !endStationName) {
    return res
      .status(400)
      .json({ error: "startStationName and endStationName are required" });
  }

  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);

  if (pageNumber < 1 || pageSize < 1) {
    return res.status(400).json({ error: "Invalid page number or limit" });
  }

  try {
    // Query MongoDB to find documents matching the start and end station names
    const locations = await Location.find({
      startStationName: { $regex: new RegExp(`^${startStationName}$`, "i") },
      endStationName: { $regex: new RegExp(`^${endStationName}$`, "i") },
    })
      .skip((pageNumber - 1) * pageSize) // Skip the documents for the previous pages
      .limit(pageSize); // Limit the number of documents returned

    // Get the total count of documents for pagination info
    const totalCount = await Location.countDocuments({
      startStationName: { $regex: new RegExp(`^${startStationName}$`, "i") },
      endStationName: { $regex: new RegExp(`^${endStationName}$`, "i") },
    });

    if (locations.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found for the provided station names" });
    }

    res.status(200).json({
      data: locations,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(totalCount / pageSize),
        totalCount: totalCount,
      },
    });
  } catch (err) {
    console.error("Error in getTrainDataByStations controller:", err);
    res.status(500).json({ error: "Failed to retrieve location data" });
  }
};

module.exports = {
  updateLocation,
  getAllTrainData,
  getTrainDataByStations,
};
