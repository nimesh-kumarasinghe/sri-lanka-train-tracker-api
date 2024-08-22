const { pool } = require("../config/dbConfig");

// get all engine details
const getAllEngines = async () => {
  const [rows] = await pool.query("SELECT * FROM engine");
  return rows;
};

// get engine details by id
const getEngineById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM engine WHERE engine_id = ?", [
    id,
  ]);
  return rows[0];
};

// create a engine
const createEngine = async (
  engine_id,
  iotdevice_id,
  train_id,
  engine_class,
  manufacturer_year,
  engine_type,
  fuel_type,
  horsepower,
  torque_nm,
  cylinders,
  weight_kg
) => {
  const [result] = await pool.query(
    "INSERT INTO engine(engine_id, iotdevice_id, train_id, engine_class, manufacturer_year, engine_type, fuel_type, horsepower, torque_nm, cylinders, weight_kg) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    [
      engine_id,
      iotdevice_id,
      train_id,
      engine_class,
      manufacturer_year,
      engine_type,
      fuel_type,
      horsepower,
      torque_nm,
      cylinders,
      weight_kg,
    ]
  );
  return {
    engine_id: result.engine_id,
    iotdevice_id,
    train_id,
    engine_class,
    manufacturer_year,
    engine_type,
    fuel_type,
    horsepower,
    torque_nm,
    cylinders,
    weight_kg,
  };
};

module.exports = {
  getAllEngines,
  getEngineById,
  createEngine,
};
