const Joi = require('joi');

const Measurement = Joi.object({
    value: Joi.number().required(),
    unit: Joi.string().required()
})

const ForecastData = Joi.object({
    wind: Measurement.required(),
    humidity: Measurement.required(),
    temperature: Measurement.required()
})

const StationForecast = Joi.object({
    date: Joi.date().required(),
    station_code: Joi.number().required(),
    forecast: ForecastData.required()
})

const StationQueryParams = Joi.object({
    city: Joi.string().optional().default(''),
    page: Joi.number().optional().default(1),
    limit: Joi.number().optional().default(50),
    sort: Joi.string().optional().default('code'),
    sort_order: Joi.string().optional().default('ASC')
})

const Station = Joi.object({
    city: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    installation_date: Joi.date().required()
})

const StationUpdate = Joi.object({
    city: Joi.string().optional(),
    latitude: Joi.number().optional(),
    longitude: Joi.number().optional(),
    installation_date: Joi.date().optional()
})

const StationDataRequest = Joi.object({
    date_from: Joi.date().optional(),
    date_to: Joi.date().optional(),
    type: Joi.string().optional(),
    page: Joi.number().optional().default(1),
    limit: Joi.number().optional().default(50),
    sort: Joi.string().optional().default('date'),
    forecast: Joi.boolean().optional().default(false),
    summary: Joi.boolean().optional().default(false)
})

const SensorData = Joi.object({
    sensor_id: Joi.string().required(),
    date: Joi.date().required(),
    type: Joi.string().required(),
    measurement: Joi.number().required(),
    unit: Joi.string().required()
})

const BatchData = Joi.object({
    station_code: Joi.number().required(),
    data: Joi.array().items(SensorData).required()
})

module.exports = {
    Measurement,
    ForecastData,
    StationForecast,
    StationQueryParams,
    Station,
    StationUpdate,
    StationDataRequest,
    SensorData,
    BatchData
}