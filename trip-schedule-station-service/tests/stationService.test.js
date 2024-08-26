const stationController = require("../controllers/stationController");
const stationService = require("../services/stationService");

jest.mock("../services/stationService");

describe("Station Controller", () => {
  // Test for getAllStations
  describe("getAllStations", () => {
    it("should return all stations", async () => {
      const stations = [
        { id: 1, name: "Station 1" },
        { id: 2, name: "Station 2" },
      ];
      stationService.getAllStations.mockResolvedValue(stations);

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await stationController.getAllStations(req, res);

      expect(stationService.getAllStations).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(stations);
    });

    it("should return 500 if there is a server error", async () => {
      stationService.getAllStations.mockRejectedValue(
        new Error("Server Error")
      );

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await stationController.getAllStations(req, res);

      expect(stationService.getAllStations).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Data retrieving failed",
      });
    });
  });

  // Test for getStationById
  describe("getStationById", () => {
    it("should return station details if station exists", async () => {
      const station = { id: 1, name: "Station 1" };
      stationService.getStationById.mockResolvedValue(station);

      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await stationController.getStationById(req, res);

      expect(stationService.getStationById).toHaveBeenCalledWith("1");
      expect(res.json).toHaveBeenCalledWith(station);
    });

    it("should return 404 if station does not exist", async () => {
      stationService.getStationById.mockResolvedValue(null);

      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await stationController.getStationById(req, res);

      expect(stationService.getStationById).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Station not found" });
    });

    it("should return 500 if there is a server error", async () => {
      stationService.getStationById.mockRejectedValue(
        new Error("Server Error")
      );

      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await stationController.getStationById(req, res);

      expect(stationService.getStationById).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Data retrieving failed",
      });
    });
  });

  // Test for createStation
  describe("createStation", () => {
    it("should create a new station", async () => {
      const newStation = {
        id: 1,
        station_name: "Station 1",
        latitude: 10.0,
        longitude: 20.0,
      };
      stationService.createStation.mockResolvedValue(newStation);

      const req = {
        body: {
          station_id: "1",
          station_name: "Station 1",
          latitude: 10.0,
          longitude: 20.0,
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await stationController.createStation(req, res);

      expect(stationService.createStation).toHaveBeenCalledWith(
        "1",
        "Station 1",
        10.0,
        20.0
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newStation);
    });

    it("should return 500 if there is a server error", async () => {
      stationService.createStation.mockRejectedValue(new Error("Server Error"));

      const req = {
        body: {
          station_id: "1",
          station_name: "Station 1",
          latitude: 10.0,
          longitude: 20.0,
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await stationController.createStation(req, res);

      expect(stationService.createStation).toHaveBeenCalledWith(
        "1",
        "Station 1",
        10.0,
        20.0
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Data insertion failed",
      });
    });
  });

  // Test for updateStation
  describe("updateStation", () => {
    it("should update station details if station exists", async () => {
      const updatedStation = {
        id: 1,
        station_name: "Updated Station",
        latitude: 11.0,
        longitude: 21.0,
      };
      stationService.updateStation.mockResolvedValue(updatedStation);

      const req = {
        params: { id: "1" },
        body: {
          station_name: "Updated Station",
          latitude: 11.0,
          longitude: 21.0,
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await stationController.updateStation(req, res);

      expect(stationService.updateStation).toHaveBeenCalledWith("1", {
        station_name: "Updated Station",
        latitude: 11.0,
        longitude: 21.0,
      });
      expect(res.json).toHaveBeenCalledWith(updatedStation);
    });

    it("should return 404 if station does not exist", async () => {
      stationService.updateStation.mockResolvedValue(null);

      const req = {
        params: { id: "1" },
        body: {
          station_name: "Updated Station",
          latitude: 11.0,
          longitude: 21.0,
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await stationController.updateStation(req, res);

      expect(stationService.updateStation).toHaveBeenCalledWith("1", {
        station_name: "Updated Station",
        latitude: 11.0,
        longitude: 21.0,
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Station not found" });
    });

    it("should return 500 if there is a server error", async () => {
      stationService.updateStation.mockRejectedValue(new Error("Server Error"));

      const req = {
        params: { id: "1" },
        body: {
          station_name: "Updated Station",
          latitude: 11.0,
          longitude: 21.0,
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await stationController.updateStation(req, res);

      expect(stationService.updateStation).toHaveBeenCalledWith("1", {
        station_name: "Updated Station",
        latitude: 11.0,
        longitude: 21.0,
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Data update failed" });
    });
  });

  // Test for deleteStation
  describe("deleteStation", () => {
    it("should delete a station if it exists", async () => {
      stationService.deleteStation.mockResolvedValue({ affectedRows: 1 });

      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await stationController.deleteStation(req, res);

      expect(stationService.deleteStation).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Station deleted successfully",
      });
    });

    it("should return 404 if station does not exist", async () => {
      stationService.deleteStation.mockResolvedValue({ affectedRows: 0 });

      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await stationController.deleteStation(req, res);

      expect(stationService.deleteStation).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Station not found" });
    });

    it("should return 500 if there is a server error", async () => {
      stationService.deleteStation.mockRejectedValue(new Error("Server Error"));

      const req = { params: { id: "1" } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await stationController.deleteStation(req, res);

      expect(stationService.deleteStation).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Data delete failed" });
    });
  });
});
