const stationsModels = require('../models/stations');
const { executeQuery } = require('../database/database');
const stationsQueries = require('../database/queries/stations');
const { validateSortingParameters, buildStationsQuery, updateStationInDb, getForecastForNextDay, getStationDataSummaryOrPaginated } = require('../utils/stations');


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


const createStation = async (data) => {
    const { value, error } = stationsModels.Station.validate(data);

    try {
        const result = await executeQuery(stationsQueries.INSERT_STATION, [value.city, value.latitude, value.longitude, value.installation_date]);
        return result;
    } 
    catch (error) {
        throw error;
    }
}


const updateStation = async (code, data) => {
    const { value, error } = stationsModels.StationUpdate.validate(data);
    const [final_query, params] = await updateStationInDb(code, value);

    try {
        const results = await executeQuery(final_query, params);

        const updated_station = await executeQuery(stationsQueries.GET_STATION_BY_CITY, [code]);
        return updated_station;
    } 
    catch (error) {
        throw error;
    }
}

const deleteStation = async (code) => {
    try {
        const result = await executeQuery(stationsQueries.DELETE_STATION, [code]);
        return "Successful deletion";
    } catch (error) {
        throw error;
    }
}

const getStationData = async (code, data) => {
    const { value, error } = stationsModels.StationDataRequest.validate(data);

    let finalQuery = "";
    let params = [];

    if (value.forecast) {
        [finalQuery, params] = getForecastForNextDay(code);
    }
    else {
        [finalQuery, params] = getStationDataSummaryOrPaginated(code, data);
    }
    
    const result = await executeQuery(finalQuery, params);
    return result;
}

const receiveBatchData = async (data) => {
    try {
        const { value, error } = stationsModels.BatchData.validate(data);
        let errors = 0
        for (const item of value.data) {
            try {
                const result = await executeQuery(stationsQueries.CREATE_BATCH_SENSOR_DATA, 
                    [item.sensor_id, data.station_code, item.date, item.type, item.measurement, item.unit]);
            } catch (error) {
                errors += 1;
                console.log(error.message);
            }
        }
    } catch (error) {
        throw new HTTPError(400, detail=error);
    }
}

module.exports = {
    createStationForecast,
    getStations,
    createStation,
    updateStation,
    deleteStation,
    getStationData,
    receiveBatchData
}