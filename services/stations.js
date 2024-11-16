const stationsModels = require('../models/stations');
const { executeQuery } = require('../database/database');
const stationsQueries = require('../database/queries/stations');


const createStationForecast = async (data) => {
    try {
        const { value, error } = stationsModels.StationForecast.validate(data);

        if (error) {
            throw new Error(`Validation error: ${error.details[0].message}`);
        }

        const forecast_map = {
            'wind': value.forecast.wind,
            'temperature': value.forecast.temperature,
            'humidity': value.forecast.humidity
        }
        
        for (const [key, item] of Object.entries(forecast_map)) {
            await executeQuery(stationsQueries.CREATE_FORECAST, [value.date, value.station_code, key, item.value, item.unit]);
        }

        return value;

    } catch (error) {
        throw error;
    }

}


// const createSensorReading = async (data) => {
//     const { error } = SensorReadingModel.validate(data);
//     if (error) {
//         throw new Error(`Validation error: ${error.details[0].message}`);
//     }
//     const result = await executeQuery(CREATE_SENSOR_DATA, [data.sensor_id, data.station_code, data.date, data.type, data.measurement, data.unit]);
//     return data;
// }

module.exports = {
    createStationForecast
}