const routeModel = require("../models/routeModel");

// get all route details
const getAllRoutes = async () => {
  return routeModel.getAllRoutes();
};

// get route details by id
const getRouteById = async (id) => {
  return routeModel.getRouteById(id);
};

// create a route
const createRoute = async (
  route_code,
  start_station,
  end_station,
  distance
) => {
  return routeModel.createRoute(
    route_code,
    start_station,
    end_station,
    distance
  );
};

module.exports = {
  getAllRoutes,
  getRouteById,
  createRoute,
};
