const request = require("supertest");
const express = require("express");
const trainController = require("../controllers/trainController");
const trainService = require("../services/trainService");

const app = express();
app.use(express.json());

// Mock routes for testing
app.get("/api/trains", trainController.getAllTrains);
app.get("/api/trains/:id", trainController.getTrainById);
app.post("/api/trains", trainController.createTrain);
app.put("/api/trains/:id", trainController.updateTrain);
app.delete("/api/trains/:id", trainController.deleteTrain);

// Mock the trainService methods
jest.mock("../services/trainService");

describe("Train Controller", () => {
  describe("getAllTrains", () => {
    it("should return all trains", async () => {
      const mockTrains = [{ train_id: 1, train_name: "Express" }];
      trainService.getAllTrains.mockResolvedValue(mockTrains);

      const res = await request(app).get("/api/trains");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockTrains);
    });

    it("should return 500 if there's an error", async () => {
      trainService.getAllTrains.mockRejectedValue(new Error("Server Error"));

      const res = await request(app).get("/api/trains");

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Server Error" });
    });
  });

  describe("getTrainById", () => {
    it("should return a train if found", async () => {
      const mockTrain = { train_id: 1, train_name: "Express" };
      trainService.getTrainById.mockResolvedValue(mockTrain);

      const res = await request(app).get("/api/trains/1");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockTrain);
    });

    it("should return 404 if train not found", async () => {
      trainService.getTrainById.mockResolvedValue(null);

      const res = await request(app).get("/api/trains/99");

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: "Train not found" });
    });

    it("should return 500 if there's an error", async () => {
      trainService.getTrainById.mockRejectedValue(new Error("Server Error"));

      const res = await request(app).get("/api/trains/1");

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Server Error" });
    });
  });

  describe("createTrain", () => {
    it("should create a new train", async () => {
      const mockTrain = { train_id: 1, train_name: "Express" };
      trainService.createTrain.mockResolvedValue(mockTrain);

      const res = await request(app).post("/api/trains").send({
        train_id: 1,
        route_id: 101,
        train_name: "Express",
        no_of_boxes: 10,
        passenger_capacity: 500,
        first_class: 50,
        second_class: 100,
        third_class: 350,
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(mockTrain);
    });

    it("should return 500 if there's an error", async () => {
      trainService.createTrain.mockRejectedValue(new Error("Server Error"));

      const res = await request(app).post("/api/trains").send({
        train_id: 1,
        route_id: 101,
        train_name: "Express",
        no_of_boxes: 10,
        passenger_capacity: 500,
        first_class: 50,
        second_class: 100,
        third_class: 350,
      });

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Server Error" });
    });
  });

  describe("updateTrain", () => {
    it("should update the train if it exists", async () => {
      const mockUpdatedTrain = { train_id: 1, train_name: "Updated Express" };
      trainService.updateTrain.mockResolvedValue(mockUpdatedTrain);

      const res = await request(app)
        .put("/api/trains/1")
        .send({ train_name: "Updated Express" });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockUpdatedTrain);
    });

    it("should return 404 if train not found", async () => {
      trainService.updateTrain.mockResolvedValue(null);

      const res = await request(app)
        .put("/api/trains/99")
        .send({ train_name: "Nonexistent Train" });

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: "Train not found" });
    });

    it("should return 500 if there's an error", async () => {
      trainService.updateTrain.mockRejectedValue(new Error("Server Error"));

      const res = await request(app)
        .put("/api/trains/1")
        .send({ train_name: "Updated Express" });

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Server Error" });
    });
  });

  describe("deleteTrain", () => {
    it("should delete the train if it exists", async () => {
      trainService.deleteTrain.mockResolvedValue({ affectedRows: 1 });

      const res = await request(app).delete("/api/trains/1");

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({ message: "Train deleted successfully" });
    });

    it("should return 404 if train not found", async () => {
      trainService.deleteTrain.mockResolvedValue({ affectedRows: 0 });

      const res = await request(app).delete("/api/trains/99");

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: "Train not found" });
    });

    it("should return 500 if there's an error", async () => {
      trainService.deleteTrain.mockRejectedValue(new Error("Server Error"));

      const res = await request(app).delete("/api/trains/1");

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Server Error" });
    });
  });
});
