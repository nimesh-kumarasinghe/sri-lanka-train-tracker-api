const tripService = require("../services/tripService");

// get all trip details
const getAllTrips = async (req, res) => {
  try {
    const trips = await tripService.getAllTrips();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// get trip details by id
const getTripById = async (req, res) => {
  const { id } = req.params;
  try {
    const trip = await tripService.getTripById(id);
    if (trip) {
      res.json(trip);
    } else {
      res.status(404).json({ message: "Trip not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllTrips,
  getTripById,
};
