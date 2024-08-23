const tripStationAssignController = require("../controllers/tripStationAssignController");
const tripStationAssignService = require("../services/tripStationAssignService");

jest.mock("../services/tripStationAssignService");

describe("Trip Station Assign Controller", () => {
  // Test for getAllTripStations
  describe("getAllTripStations", () => {
    it("should return all trip stations", async () => {
      const stations = [
        { id: 1, name: "Station 1" },
        { id: 2, name: "Station 2" },
      ];
      tripStationAssignService.getAllTripStations.mockResolvedValue(stations);

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripStationAssignController.getAllTripStations(req, res);

      expect(tripStationAssignService.getAllTripStations).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(stations);
    });

    it("should return 500 if there is a server error", async () => {
      tripStationAssignService.getAllTripStations.mockRejectedValue(
        new Error("Server Error")
      );

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripStationAssignController.getAllTripStations(req, res);

      expect(tripStationAssignService.getAllTripStations).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Server Error" });
    });
  });

  // Test for getStationByTripId
  describe("getStationByTripId", () => {
    it("should return station details if station exists", async () => {
      const station = { id: 1, name: "Station 1" };
      tripStationAssignService.getStationByTripId.mockResolvedValue(station);

      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripStationAssignController.getStationByTripId(req, res);

      expect(tripStationAssignService.getStationByTripId).toHaveBeenCalledWith(
        "1"
      );
      expect(res.json).toHaveBeenCalledWith(station);
    });

    it("should return 404 if station does not exist", async () => {
      tripStationAssignService.getStationByTripId.mockResolvedValue(null);

      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripStationAssignController.getStationByTripId(req, res);

      expect(tripStationAssignService.getStationByTripId).toHaveBeenCalledWith(
        "1"
      );
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Stations not found" });
    });

    it("should return 500 if there is a server error", async () => {
      tripStationAssignService.getStationByTripId.mockRejectedValue(
        new Error("Server Error")
      );

      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripStationAssignController.getStationByTripId(req, res);

      expect(tripStationAssignService.getStationByTripId).toHaveBeenCalledWith(
        "1"
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Server Error" });
    });
  });

  // Test for assignStation
  describe("assignStation", () => {
    it("should assign a new station", async () => {
      const newStation = {
        id: 1,
        trip_id: "1",
        station_id: "1",
        arrival_time: "10:00",
        departure_time: "12:00",
      };
      tripStationAssignService.assignStation.mockResolvedValue(newStation);

      const req = {
        body: {
          trip_id: "1",
          station_id: "1",
          arrival_time: "10:00",
          departure_time: "12:00",
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripStationAssignController.assignStation(req, res);

      expect(tripStationAssignService.assignStation).toHaveBeenCalledWith(
        "1",
        "1",
        "10:00",
        "12:00"
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newStation);
    });

    it("should return 500 if there is a server error", async () => {
      tripStationAssignService.assignStation.mockRejectedValue(
        new Error("Server Error")
      );

      const req = {
        body: {
          trip_id: "1",
          station_id: "1",
          arrival_time: "10:00",
          departure_time: "12:00",
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripStationAssignController.assignStation(req, res);

      expect(tripStationAssignService.assignStation).toHaveBeenCalledWith(
        "1",
        "1",
        "10:00",
        "12:00"
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Server Error" });
    });
  });

  // Test for updateAssignStation
  describe("updateAssignStation", () => {
    it("should update assigned station if it exists", async () => {
      const updatedStation = {
        id: 1,
        trip_id: "1",
        station_id: "1",
        arrival_time: "10:00",
        departure_time: "13:00",
      };
      tripStationAssignService.updateAssignStation.mockResolvedValue(
        updatedStation
      );

      const req = {
        params: { id: "1" },
        body: { arrival_time: "10:00", departure_time: "13:00" },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripStationAssignController.updateAssignStation(req, res);

      expect(tripStationAssignService.updateAssignStation).toHaveBeenCalledWith(
        "1",
        { arrival_time: "10:00", departure_time: "13:00" }
      );
      expect(res.json).toHaveBeenCalledWith(updatedStation);
    });

    it("should return 404 if assigned station does not exist", async () => {
      tripStationAssignService.updateAssignStation.mockResolvedValue(null);

      const req = {
        params: { id: "1" },
        body: { arrival_time: "10:00", departure_time: "13:00" },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripStationAssignController.updateAssignStation(req, res);

      expect(tripStationAssignService.updateAssignStation).toHaveBeenCalledWith(
        "1",
        { arrival_time: "10:00", departure_time: "13:00" }
      );
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Data not found" });
    });

    it("should return 500 if there is a server error", async () => {
      tripStationAssignService.updateAssignStation.mockRejectedValue(
        new Error("Server Error")
      );

      const req = {
        params: { id: "1" },
        body: { arrival_time: "10:00", departure_time: "13:00" },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripStationAssignController.updateAssignStation(req, res);

      expect(tripStationAssignService.updateAssignStation).toHaveBeenCalledWith(
        "1",
        { arrival_time: "10:00", departure_time: "13:00" }
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Server Error" });
    });
  });

  // Test for deleteAssignStation
  describe("deleteAssignStation", () => {
    it("should delete an assigned station if it exists", async () => {
      tripStationAssignService.deleteAssignStation.mockResolvedValue({
        affectedRows: 1,
      });

      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripStationAssignController.deleteAssignStation(req, res);

      expect(tripStationAssignService.deleteAssignStation).toHaveBeenCalledWith(
        "1"
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Assigned station deleted successfully",
      });
    });

    it("should return 404 if assigned station does not exist", async () => {
      tripStationAssignService.deleteAssignStation.mockResolvedValue({
        affectedRows: 0,
      });

      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripStationAssignController.deleteAssignStation(req, res);

      expect(tripStationAssignService.deleteAssignStation).toHaveBeenCalledWith(
        "1"
      );
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Station not found" });
    });

    it("should return 500 if there is a server error", async () => {
      tripStationAssignService.deleteAssignStation.mockRejectedValue(
        new Error("Server Error")
      );

      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await tripStationAssignController.deleteAssignStation(req, res);

      expect(tripStationAssignService.deleteAssignStation).toHaveBeenCalledWith(
        "1"
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Server Error" });
    });
  });
});
