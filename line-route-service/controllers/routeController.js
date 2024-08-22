const routeService = require("../services/routeService");

// get all route details
const getAllRoutes = async (req, res) => {
  try {
    const routes = await routeService.getAllRoutes();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// get route details by id
const getRouteById = async (req, res) => {
  const { id } = req.params;
  try {
    const route = await routeService.getRouteById(id);
    if (route) {
      res.json(route);
    } else {
      res.status(404).json({ message: "Route not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// create a route
const createRoute = async (req, res) => {
  const { route_code, start_station, end_station, distance } = req.body;
  try {
    const newRoute = await routeService.createRoute(
      route_code,
      start_station,
      end_station,
      distance
    );
    res.status(201).json(newRoute);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// update route details
const updateRoute = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updateRoute = await routeService.updateRoute(id, updates);
    if (updateRoute) {
      res.json(updateRoute);
    } else {
      res.status(404).json({ message: "Route not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// delete a route
const deleteRoute = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await routeService.deleteRoute(id);

    if (result.affectedRows > 0) {
      res.status(201).json({ message: "Route deleted successfully" });
    } else {
      res.status(404).json({ message: "Route not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllRoutes,
  getRouteById,
  createRoute,
  updateRoute,
  deleteRoute,
};
