const tripController = require("../controllers/tripController");
const tripService = require("../services/tripService");

jest.mock("../services/tripService");

describe("Trip Controller", () => {
  // Test for getAllTrips
  describe("getAllTrips", () => {
    it("should return all trips", async () => {
      const trips = [
        { id: 1, name: "Trip 1" },
        { id: 2, name: "Trip 2" },
      ];
      tripService.getAllTrips.mockResolvedValue(trips);

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripController.getAllTrips(req, res);

      expect(tripService.getAllTrips).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(trips);
    });

    it("should return 500 if there is a server error", async () => {
      tripService.getAllTrips.mockRejectedValue(new Error("Server Error"));

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripController.getAllTrips(req, res);

      expect(tripService.getAllTrips).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Data retrieving failed",
      });
    });
  });

  // Test for getTripById
  describe("getTripById", () => {
    it("should return trip details if trip exists", async () => {
      const trip = { id: 1, name: "Trip 1" };
      tripService.getTripById.mockResolvedValue(trip);

      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripController.getTripById(req, res);

      expect(tripService.getTripById).toHaveBeenCalledWith("1");
      expect(res.json).toHaveBeenCalledWith(trip);
    });

    it("should return 404 if trip does not exist", async () => {
      tripService.getTripById.mockResolvedValue(null);

      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripController.getTripById(req, res);

      expect(tripService.getTripById).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Trip not found" });
    });

    it("should return 500 if there is a server error", async () => {
      tripService.getTripById.mockRejectedValue(new Error("Server Error"));

      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripController.getTripById(req, res);

      expect(tripService.getTripById).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Data retrieving failed",
      });
    });
  });

  // Test for createTrip
  describe("createTrip", () => {
    it("should create a new trip", async () => {
      const newTrip = { id: 1, name: "New Trip" };
      tripService.createTrip.mockResolvedValue(newTrip);

      const req = {
        body: {
          trip_id: "1",
          route_id: "1",
          train_id: "1",
          trip_type: "Express",
          duration: "2h",
          max_speed_kmh: 120,
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripController.createTrip(req, res);

      expect(tripService.createTrip).toHaveBeenCalledWith(
        "1",
        "1",
        "1",
        "Express",
        "2h",
        120
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newTrip);
    });

    it("should return 500 if there is a server error", async () => {
      tripService.createTrip.mockRejectedValue(new Error("Server Error"));

      const req = {
        body: {
          trip_id: "1",
          route_id: "1",
          train_id: "1",
          trip_type: "Express",
          duration: "2h",
          max_speed_kmh: 120,
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripController.createTrip(req, res);

      expect(tripService.createTrip).toHaveBeenCalledWith(
        "1",
        "1",
        "1",
        "Express",
        "2h",
        120
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Data insertion failed",
      });
    });
  });

  // Test for updateTrip
  describe("updateTrip", () => {
    it("should update trip details if trip exists", async () => {
      const updatedTrip = { id: 1, name: "Updated Trip" };
      tripService.updateTrip.mockResolvedValue(updatedTrip);

      const req = { params: { id: "1" }, body: { name: "Updated Trip" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripController.updateTrip(req, res);

      expect(tripService.updateTrip).toHaveBeenCalledWith("1", {
        name: "Updated Trip",
      });
      expect(res.json).toHaveBeenCalledWith(updatedTrip);
    });

    it("should return 404 if trip does not exist", async () => {
      tripService.updateTrip.mockResolvedValue(null);

      const req = { params: { id: "1" }, body: { name: "Updated Trip" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripController.updateTrip(req, res);

      expect(tripService.updateTrip).toHaveBeenCalledWith("1", {
        name: "Updated Trip",
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Trip not found" });
    });

    it("should return 500 if there is a server error", async () => {
      tripService.updateTrip.mockRejectedValue(new Error("Server Error"));

      const req = { params: { id: "1" }, body: { name: "Updated Trip" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripController.updateTrip(req, res);

      expect(tripService.updateTrip).toHaveBeenCalledWith("1", {
        name: "Updated Trip",
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Data update failed" });
    });
  });

  // Test for deleteTrip
  describe("deleteTrip", () => {
    it("should delete a trip if it exists", async () => {
      tripService.deleteTrip.mockResolvedValue({ affectedRows: 1 });

      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripController.deleteTrip(req, res);

      expect(tripService.deleteTrip).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Trip deleted successfully",
      });
    });

    it("should return 404 if trip does not exist", async () => {
      tripService.deleteTrip.mockResolvedValue({ affectedRows: 0 });

      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripController.deleteTrip(req, res);

      expect(tripService.deleteTrip).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Trip not found" });
    });

    it("should return 500 if there is a server error", async () => {
      tripService.deleteTrip.mockRejectedValue(new Error("Server Error"));

      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripController.deleteTrip(req, res);

      expect(tripService.deleteTrip).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Data delete failed" });
    });
  });
});
