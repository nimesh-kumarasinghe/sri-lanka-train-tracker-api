const { pool } = require("../config/dbConfig");

// get all engine details
const getAllEngines = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM engine");
    return rows;
  } catch (err) {
    throw err;
  }
};

// get engine details by id
const getEngineById = async (id) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM engine WHERE engine_id = ?",
      [id]
    );
    return rows[0];
  } catch (err) {
    throw err;
  }
};

// get train id details by iot id
const getTrainByIotid = async (id) => {
  try {
    const [rows] = await pool.query(
      "SELECT train_id FROM engine WHERE iotdevice_id = ?",
      [id]
    );
    return rows[0];
  } catch (err) {
    throw err;
  }
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
  try {
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
  } catch (err) {
    throw err;
  }
};

// update engine details
const updateEngine = async (id, updates) => {
  try {
    const [result] = await pool.query(
      "UPDATE engine SET ? WHERE engine_id = ?",
      [updates, id]
    );
    if (result.affectedRows === 0) return null;
    return getEngineById(id);
  } catch (err) {
    throw err;
  }
};

// delete a engine
const deleteEngine = async (id) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM engine WHERE engine_id = ?",
      [id]
    );
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllEngines,
  getEngineById,
  createEngine,
  updateEngine,
  deleteEngine,
  getTrainByIotid,
};
