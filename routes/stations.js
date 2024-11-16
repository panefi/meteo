var express = require('express');
var router = express.Router();
const { createStationForecast } = require('../services/stations');

/**
 * @swagger
 * /stations/forecast:
 *   post:
 *     summary: Create a station forecast
 *     tags:
 *       - Stations
 *     responses:
 *       200:
 *         description: Forecast created successfully
 *       400:
 *         description: Invalid input data format
 */
router.post('/forecast', async(req, res) => {
    /**
    Create a forecast for a specific station on a given date.

    The request body should be structured as follows:
    {
        "date": <str>,  // The date for the forecast in YYYY-MM-DD format
        "station_code": <int>,  // The code of the station
        "forecast": {
            "wind": {
                "value": <float>,  // Wind speed value
                "unit": "m/s"
            },
            "humidity": {
                "value": <float>,  // Humidity percentage
                "unit": "%"
            },
            "temperature": {
                "value": <float>,  // Temperature value
                "unit": "Celsius"
            }
        }
    }

    - `date`: The date for which the forecast is being created.
    - `station_code`: The unique code identifying the station.
    - `forecast`: An object containing forecast details for:
      - `wind`: Wind speed and its unit.
      - `humidity`: Humidity level and its unit.
      - `temperature`: Temperature value and its unit.
    */
    try {
        const result = await createStationForecast(req.body);
        res.status(201).json(req.body);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;