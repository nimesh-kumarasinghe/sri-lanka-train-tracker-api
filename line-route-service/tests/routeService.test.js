const request = require("supertest");
const express = require("express");
const routeController = require("../controllers/routeController");
const routeService = require("../services/routeService");

const app = express();
app.use(express.json());

// Mock routes for testing
app.get("/api/routes", routeController.getAllRoutes);
app.get("/api/routes/:id", routeController.getRouteById);
app.post("/api/routes", routeController.createRoute);
app.put("/api/routes/:id", routeController.updateRoute);
app.delete("/api/routes/:id", routeController.deleteRoute);

// Mock the routeService methods
jest.mock("../services/routeService");

describe("Route Controller", () => {
  describe("getAllRoutes", () => {
    it("should return all routes", async () => {
      const mockRoutes = [
        {
          route_code: "R1",
          start_station: "Station A",
          end_station: "Station B",
          distance: 100,
        },
      ];
      routeService.getAllRoutes.mockResolvedValue(mockRoutes);

      const res = await request(app).get("/api/routes");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockRoutes);
    });

    it("should return 500 if there's an error", async () => {
      routeService.getAllRoutes.mockRejectedValue(new Error("Server Error"));

      const res = await request(app).get("/api/routes");

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Server Error" });
    });
  });

  describe("getRouteById", () => {
    it("should return a route if found", async () => {
      const mockRoute = {
        route_code: "R1",
        start_station: "Station A",
        end_station: "Station B",
        distance: 100,
      };
      routeService.getRouteById.mockResolvedValue(mockRoute);

      const res = await request(app).get("/api/routes/1");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockRoute);
    });

    it("should return 404 if route not found", async () => {
      routeService.getRouteById.mockResolvedValue(null);

      const res = await request(app).get("/api/routes/99");

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: "Route not found" });
    });

    it("should return 500 if there's an error", async () => {
      routeService.getRouteById.mockRejectedValue(new Error("Server Error"));

      const res = await request(app).get("/api/routes/1");

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Server Error" });
    });
  });

  describe("createRoute", () => {
    it("should create a new route", async () => {
      const mockRoute = {
        route_code: "R1",
        start_station: "Station A",
        end_station: "Station B",
        distance: 100,
      };
      routeService.createRoute.mockResolvedValue(mockRoute);

      const res = await request(app).post("/api/routes").send({
        route_code: "R1",
        start_station: "Station A",
        end_station: "Station B",
        distance: 100,
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(mockRoute);
    });

    it("should return 500 if there's an error", async () => {
      routeService.createRoute.mockRejectedValue(new Error("Server Error"));

      const res = await request(app).post("/api/routes").send({
        route_code: "R1",
        start_station: "Station A",
        end_station: "Station B",
        distance: 100,
      });

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Server Error" });
    });
  });

  describe("updateRoute", () => {
    it("should update the route if it exists", async () => {
      const mockUpdatedRoute = {
        route_code: "R1",
        start_station: "Updated Station A",
        end_station: "Updated Station B",
        distance: 150,
      };
      routeService.updateRoute.mockResolvedValue(mockUpdatedRoute);

      const res = await request(app).put("/api/routes/1").send({
        start_station: "Updated Station A",
        end_station: "Updated Station B",
        distance: 150,
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockUpdatedRoute);
    });

    it("should return 404 if route not found", async () => {
      routeService.updateRoute.mockResolvedValue(null);

      const res = await request(app).put("/api/routes/99").send({
        start_station: "Nonexistent Station",
        end_station: "Nonexistent Station",
        distance: 200,
      });

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: "Route not found" });
    });

    it("should return 500 if there's an error", async () => {
      routeService.updateRoute.mockRejectedValue(new Error("Server Error"));

      const res = await request(app).put("/api/routes/1").send({
        start_station: "Updated Station A",
        end_station: "Updated Station B",
        distance: 150,
      });

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Server Error" });
    });
  });

  describe("deleteRoute", () => {
    it("should delete the route if it exists", async () => {
      routeService.deleteRoute.mockResolvedValue({ affectedRows: 1 });

      const res = await request(app).delete("/api/routes/1");

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({ message: "Route deleted successfully" });
    });

    it("should return 404 if route not found", async () => {
      routeService.deleteRoute.mockResolvedValue({ affectedRows: 0 });

      const res = await request(app).delete("/api/routes/99");

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: "Route not found" });
    });

    it("should return 500 if there's an error", async () => {
      routeService.deleteRoute.mockRejectedValue(new Error("Server Error"));

      const res = await request(app).delete("/api/routes/1");

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Server Error" });
    });
  });
});
