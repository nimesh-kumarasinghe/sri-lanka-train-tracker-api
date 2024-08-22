const routeModel = require("../models/routeModel");

// get all route details
const getAllRoutes = async () => {
  return routeModel.getAllRoutes();
};

// get route details by id
const getRouteById = async (id) => {
  return routeModel.getRouteById(id);
};

module.exports = {
  getAllRoutes,
  getRouteById,
};
