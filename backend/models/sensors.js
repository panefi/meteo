const Joi = require('joi');

const SensorReadingModel = Joi.object({
    sensor_id: Joi.string().required(),
    station_code: Joi.number().required(),
    date: Joi.date().required(),
    type: Joi.string().required(),
    measurement: Joi.number().required(),
    unit: Joi.string().required()
})

module.exports = {
    SensorReadingModel
}