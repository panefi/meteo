const CREATE_SENSOR_DATA = `
  INSERT INTO sensors_data (sensor_id, station_code, date, type, measurement, unit)
  VALUES (?, ?, ?, ?, ?, ?)
`;

const SELECT_ALL_STATIONS = `
  SELECT * FROM stations;
`;

module.exports = {
  CREATE_SENSOR_DATA,
  SELECT_ALL_STATIONS
};