const request = require("supertest");
const express = require("express");
const engineController = require("../controllers/engineController");
const engineService = require("../services/engineService");

const app = express();
app.use(express.json());

// Mock routes for testing
app.get("/api/engines", engineController.getAllEngines);
app.get("/api/engines/:id", engineController.getEngineById);
app.post("/api/engines", engineController.createEngine);
app.put("/api/engines/:id", engineController.updateEngine);
app.delete("/api/engines/:id", engineController.deleteEngine);

// Mock the engineService methods
jest.mock("../services/engineService");

describe("Engine Controller", () => {
  describe("getAllEngines", () => {
    it("should return all engines", async () => {
      const mockEngines = [{ engine_id: 1, engine_class: "Class A" }];
      engineService.getAllEngines.mockResolvedValue(mockEngines);

      const res = await request(app).get("/api/engines");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockEngines);
    });

    it("should return 500 if there's an error", async () => {
      engineService.getAllEngines.mockRejectedValue(new Error("Server Error"));

      const res = await request(app).get("/api/engines");

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Data retrieving failed" });
    });
  });

  describe("getEngineById", () => {
    it("should return an engine if found", async () => {
      const mockEngine = { engine_id: 1, engine_class: "Class A" };
      engineService.getEngineById.mockResolvedValue(mockEngine);

      const res = await request(app).get("/api/engines/1");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockEngine);
    });

    it("should return 404 if engine not found", async () => {
      engineService.getEngineById.mockResolvedValue(null);

      const res = await request(app).get("/api/engines/99");

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: "Engine not found" });
    });

    it("should return 500 if there's an error", async () => {
      engineService.getEngineById.mockRejectedValue(new Error("Server Error"));

      const res = await request(app).get("/api/engines/1");

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Data retrieving failed" });
    });
  });

  describe("createEngine", () => {
    it("should create a new engine", async () => {
      const mockEngine = { engine_id: 1, engine_class: "Class A" };
      engineService.createEngine.mockResolvedValue(mockEngine);

      const res = await request(app).post("/api/engines").send({
        engine_id: 1,
        iotdevice_id: 1001,
        train_id: 101,
        engine_class: "Class A",
        manufacturer_year: 2020,
        engine_type: "Diesel",
        fuel_type: "Diesel",
        horsepower: 5000,
        torque_nm: 15000,
        cylinders: 8,
        weight_kg: 20000,
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(mockEngine);
    });

    it("should return 500 if there's an error", async () => {
      engineService.createEngine.mockRejectedValue(new Error("Server Error"));

      const res = await request(app).post("/api/engines").send({
        engine_id: 1,
        iotdevice_id: 1001,
        train_id: 101,
        engine_class: "Class A",
        manufacturer_year: 2020,
        engine_type: "Diesel",
        fuel_type: "Diesel",
        horsepower: 5000,
        torque_nm: 15000,
        cylinders: 8,
        weight_kg: 20000,
      });

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Data insertion failed" });
    });
  });

  describe("updateEngine", () => {
    it("should update the engine if it exists", async () => {
      const mockUpdatedEngine = {
        engine_id: 1,
        engine_class: "Updated Class A",
      };
      engineService.updateEngine.mockResolvedValue(mockUpdatedEngine);

      const res = await request(app)
        .put("/api/engines/1")
        .send({ engine_class: "Updated Class A" });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockUpdatedEngine);
    });

    it("should return 404 if engine not found", async () => {
      engineService.updateEngine.mockResolvedValue(null);

      const res = await request(app)
        .put("/api/engines/99")
        .send({ engine_class: "Nonexistent Engine" });

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: "Engine not found" });
    });

    it("should return 500 if there's an error", async () => {
      engineService.updateEngine.mockRejectedValue(new Error("Server Error"));

      const res = await request(app)
        .put("/api/engines/1")
        .send({ engine_class: "Updated Class A" });

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Data update failed" });
    });
  });

  describe("deleteEngine", () => {
    it("should delete the engine if it exists", async () => {
      engineService.deleteEngine.mockResolvedValue({ affectedRows: 1 });

      const res = await request(app).delete("/api/engines/1");

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({ message: "Engine deleted successfully" });
    });

    it("should return 404 if engine not found", async () => {
      engineService.deleteEngine.mockResolvedValue({ affectedRows: 0 });

      const res = await request(app).delete("/api/engines/99");

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: "Engine not found" });
    });

    it("should return 500 if there's an error", async () => {
      engineService.deleteEngine.mockRejectedValue(new Error("Server Error"));

      const res = await request(app).delete("/api/engines/1");

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Data delete failed" });
    });
  });
});
