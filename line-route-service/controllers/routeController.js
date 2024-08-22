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

module.exports = {
  getAllRoutes,
  getRouteById,
};
