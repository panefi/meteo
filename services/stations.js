const stationsModels = require('../models/stations');
const { executeQuery } = require('../database/database');
const stationsQueries = require('../database/queries/stations');
const { validateSortingParameters, buildStationsQuery } = require('../utils/stations');


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

const getStations = async (data) => {
    const { value, error } = stationsModels.StationQueryParams.validate(data);

    const [sort, sort_order] = await validateSortingParameters(value.sort, value.sort_order);
    const [final_query, params] = await buildStationsQuery(value.city, value.page, value.limit, sort, sort_order);

    try {
        const result = await executeQuery(final_query, params);
        return result;
    } 
    catch (error) {
        throw error;
    }
}


module.exports = {
    createStationForecast,
    getStations
}