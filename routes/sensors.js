var express = require('express');
var router = express.Router();
const { createSensorReading } = require('../services/sensors');
const authenticateJWT = require('../services/middleware');


/**
 * @swagger
 * /api/sensors/reading:
 *   post:
 *     summary: Create a new sensor reading
 *     tags:
 *       - Sensors
 *     responses:
 *       201:
 *         description: Sensor reading created successfully
 *       400:
 *         description: Invalid input data format
 */
router.post('/reading', authenticateJWT, async(req, res) => {
    /**
    Insert a new sensor reading into the database.

    The request body should be structured as follows:
    {
        "sensor_id": <str>,
        "station_code": <int>,
        "date": <str>,
        "type": <str>,  // Type of measurement ("temperature", "wind", "humidity")
        "measurement": <float>,  // Measured value
        "unit": <str>  // Unit of the measurement ("Celsius", "m/s", "%")
    }

    - `sensor_id`: The unique identifier for the sensor.
    - `station_code`: The code of the station where the sensor is located.
    - `date`: The date and time of the reading in ISO 8601 format.
    - `type`: The type of measurement ("temperature", "wind", "humidity").
    - `measurement`: The measured value.
    - `unit`: The unit of the measurement ("Celsius", "m/s", "%").
    */
    try {
        console.log(req.body);
        const result = await createSensorReading(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;