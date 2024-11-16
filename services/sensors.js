const { SensorReadingModel } = require('../models/sensors');
const { executeQuery } = require('../database/database');
const { CREATE_SENSOR_DATA, SELECT_ALL_STATIONS } = require('../database/queries/sensors');


const createSensorReading = async (data) => {
    const { error } = SensorReadingModel.validate(data);
    if (error) {
        throw new Error(`Validation error: ${error.details[0].message}`);
    }
    const result = await executeQuery(CREATE_SENSOR_DATA, [data.sensor_id, data.station_code, data.date, data.type, data.measurement, data.unit]);
    return data;
}

module.exports = {
    createSensorReading
}