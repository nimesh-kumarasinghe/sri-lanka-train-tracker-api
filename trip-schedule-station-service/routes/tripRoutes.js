const express = require("express");
const router = express.Router();
const tripController = require("../controllers/tripController");

router.get("/trips", tripController.getAllTrips);
router.get("/trips/:id", tripController.getTripById);
router.post("/trips", tripController.createTrip);
router.put("/trips/:id", tripController.updateTrip);
router.delete("/trips/:id", tripController.deleteTrip);

module.exports = router;
