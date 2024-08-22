const request = require("supertest");
const express = require("express");
const lineController = require("../controllers/lineController");
const lineService = require("../services/lineService");

const app = express();
app.use(express.json());

// Mock routes for testing
app.get("/api/lines", lineController.getAllLines);
app.get("/api/lines/:id", lineController.getLineById);
app.post("/api/lines", lineController.createLine);
app.put("/api/lines/:id", lineController.updateLine);
app.delete("/api/lines/:id", lineController.deleteLine);

// Mock the lineService methods
jest.mock("../services/lineService");

describe("Line Controller", () => {
  describe("getAllLines", () => {
    it("should return all lines", async () => {
      const mockLines = [{ line_id: 1, line_name: "Line A" }];
      lineService.getAllLines.mockResolvedValue(mockLines);

      const res = await request(app).get("/api/lines");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockLines);
    });

    it("should return 500 if there's an error", async () => {
      lineService.getAllLines.mockRejectedValue(new Error("Server Error"));

      const res = await request(app).get("/api/lines");

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Server Error" });
    });
  });

  describe("getLineById", () => {
    it("should return a line if found", async () => {
      const mockLine = { line_id: 1, line_name: "Line A" };
      lineService.getLineById.mockResolvedValue(mockLine);

      const res = await request(app).get("/api/lines/1");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockLine);
    });

    it("should return 404 if line not found", async () => {
      lineService.getLineById.mockResolvedValue(null);

      const res = await request(app).get("/api/lines/99");

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: "Line not found" });
    });

    it("should return 500 if there's an error", async () => {
      lineService.getLineById.mockRejectedValue(new Error("Server Error"));

      const res = await request(app).get("/api/lines/1");

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Server Error" });
    });
  });

  describe("createLine", () => {
    it("should create a new line", async () => {
      const mockLine = { line_id: 1, line_name: "Line A" };
      lineService.createLine.mockResolvedValue(mockLine);

      const res = await request(app).post("/api/lines").send({
        line_id: 1,
        line_name: "Line A",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(mockLine);
    });

    it("should return 500 if there's an error", async () => {
      lineService.createLine.mockRejectedValue(new Error("Server Error"));

      const res = await request(app).post("/api/lines").send({
        line_id: 1,
        line_name: "Line A",
      });

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Server Error" });
    });
  });

  describe("updateLine", () => {
    it("should update the line if it exists", async () => {
      const mockUpdatedLine = { line_id: 1, line_name: "Updated Line A" };
      lineService.updateLine.mockResolvedValue(mockUpdatedLine);

      const res = await request(app)
        .put("/api/lines/1")
        .send({ line_name: "Updated Line A" });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockUpdatedLine);
    });

    it("should return 404 if line not found", async () => {
      lineService.updateLine.mockResolvedValue(null);

      const res = await request(app)
        .put("/api/lines/99")
        .send({ line_name: "Nonexistent Line" });

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: "Line not found" });
    });

    it("should return 500 if there's an error", async () => {
      lineService.updateLine.mockRejectedValue(new Error("Server Error"));

      const res = await request(app)
        .put("/api/lines/1")
        .send({ line_name: "Updated Line A" });

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Server Error" });
    });
  });

  describe("deleteLine", () => {
    it("should delete the line if it exists", async () => {
      lineService.deleteLine.mockResolvedValue({ affectedRows: 1 });

      const res = await request(app).delete("/api/lines/1");

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({ message: "Line deleted successfully" });
    });

    it("should return 404 if line not found", async () => {
      lineService.deleteLine.mockResolvedValue({ affectedRows: 0 });

      const res = await request(app).delete("/api/lines/99");

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: "Line not found" });
    });

    it("should return 500 if there's an error", async () => {
      lineService.deleteLine.mockRejectedValue(new Error("Server Error"));

      const res = await request(app).delete("/api/lines/1");

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Server Error" });
    });
  });
});
