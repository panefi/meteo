var express = require('express');
var router = express.Router();
const { createStationForecast, getStations, createStation, updateStation, deleteStation, getStationData, receiveBatchData } = require('../services/stations');

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


/**
 * @swagger
 * /stations/:
 *   get:
 *     summary: Get stations
 *     description: Get all stations with pagination and sorting or the station for a specific city.
 *     tags:
 *       - Stations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               city:
 *                 type: string
 *               page:
 *                 type: integer
 *               limit:
 *                 type: integer
 *               sort:
 *                 type: string
 *               sort_order:
 *                 type: string
 *           example:
 *             city: "City 1"
 *             page: 1
 *             limit: 10
 *             sort: "name"
 *             sort_order: "ASC"
 *     responses:
 *       200:
 *         description: Stations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: integer
 *                   city:
 *                     type: string
 *                   latitude:
 *                     type: number
 *                   longitude:
 *                     type: number
 *                   installation_date:
 *                     type: string
 *                     format: date
 *             example:
 *               - code: 1
 *                 city: "City 1"
 *                 latitude: 10.0
 *                 longitude: 20.0
 *                 installation_date: "2024-08-15"
 *               - code: 2
 *                 city: "City 2"
 *                 latitude: 30.0
 *                 longitude: 40.0
 *                 installation_date: "2024-08-15"
 *       400:
 *         description: Invalid input data format
 */
router.get('/', async(req, res) => {
    /**
    Get all stations with pagination and sorting or the station for a specific city.

    - If the `city` is provided as a query parameter, the details for that specific station are retrieved.
    - If `city` is not provided, default pagination is applied.
    - Additional query parameters include:
      - `page`: The page number for pagination.
      - `limit`: The number of records per page.
      - `offset`: The number of records to skip before starting to collect the result set.
      - `sort`: The field to sort by (e.g., 'name', 'city').
      - `sort_order`: The order of sorting ('ASC' for ascending, 'DESC' for descending).
    - `date`: The date for which the forecast is being created.
    - `station_code`: The unique code identifying the station.
    - `forecast`: An object containing forecast details for:
      - `wind`: Wind speed and its unit.
      - `humidity`: Humidity level and its unit.
      - `temperature`: Temperature value and its unit.
    */
    try {
        const result = await getStations(req.query);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});


/**
 * @swagger
 * /stations/:
 *   post:
 *     summary: Create a station
 *     description: Create a new station.
 *     tags:
 *       - Stations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: integer
 *               name:
 *                 type: string
 *               city:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *           example:
 *             code: 1
 *             name: "Station 1"
 *             city: "City 1"
 *             latitude: 10.0
 *             longitude: 20.0
 *     responses:
 *       201:
 *         description: Station created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   code:
 *                     type: integer
 *                   city:
 *                     type: string
 *                   latitude:
 *                     type: number
 *                   longitude:
 *                     type: number
 *                   installation_date:
 *                     type: string
 *                     format: date
 *       400:
 *         description: Invalid input data format
 */
router.post('/', async(req, res) => {
    /**
    Get all stations with pagination and sorting or the station for a specific city.

    - If the `city` is provided as a query parameter, the details for that specific station are retrieved.
    - If `city` is not provided, default pagination is applied.
    - Additional query parameters include:
      - `page`: The page number for pagination.
      - `limit`: The number of records per page.
      - `offset`: The number of records to skip before starting to collect the result set.
      - `sort`: The field to sort by (e.g., 'name', 'city').
      - `sort_order`: The order of sorting ('ASC' for ascending, 'DESC' for descending).
    */
    try {
        const result = await createStation(req.body);
        res.status(201).json(req.body);
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            res.status(409).json({
                error: {
                    message: `A station with the city name '${req.body.city}' already exists.`
                }
            });
        }
        else {
        res.status(500).json({ 
            error: {
                message: 'An unexpected error occured.'
            } });
        }
    }
});

/**
 * @swagger
 * /stations/{code}:
 *   put:
 *     summary: Update a station
 *     description: Update a station by its code.
 *     tags:
 *       - Stations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:    
 *           schema:
 *             type: object
 *             properties:
 *               city:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       200:
 *         description: Station updated successfully
 *       400:
 *         description: Invalid input data format
 */
router.put('/:code', async(req, res) => {
    try {
        const result = await updateStation(req.params.code, req.body);
        res.status(200).json(req.body);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

/**
 * @swagger
 * /stations/{code}:
 *   delete:
 *     summary: Delete a station    
 *     description: Delete a station by its code.
 *     tags:
 *       - Stations
 *     responses:
 *       200:
 *         description: Station deleted successfully
 *       400:
 *         description: Invalid input data format
 */
router.delete('/:code', async(req, res) => {
    /*
    Delete an existing station by its code.
    */
    try {
        const result = await deleteStation(req.params.code);
        res.status(200).json({result: result});
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

/**
 * @swagger
 * /stations/{code}:
 *   post:
 *     summary: Get station data
 *     description: Get the data for a specific station by its code.
 *     tags:
 *       - Stations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date_from:
 *                 type: string
 *               date_to:
 *                 type: string
 *               type:
 *                 type: string
 *               page:
 *                 type: integer
 *               limit:
 *                 type: integer
 *               sort:
 *                 type: string
 *               forecast:
 *                 type: boolean
 *               summary:
 *                 type: boolean
 *           example:
 *             date_from: "2022-10-15"
 *             date_to: "2024-10-16"
 *             type: "wind"
 *             page: 1
 *             limit: 50
 *             sort: "date"
 *             forecast: false
 *             summary: true
 *     responses:
 *       200:
 *         description: Station data retrieved successfully
 *       400:
 *         description: Invalid input data format
 */
router.post('/:code', async(req, res) => {
    /*
    Request body containing filters for retrieving station data. 
    Fields include:
        - `date_from`: Start date for data retrieval.
        - `date_to`: End date for data retrieval.
        - `forecast`: Boolean indicating if forecast data should be retrieved.
        - `summary`: Boolean: When true the average properties for the given period are retrieved.
                                  "When false all data are retrieved and pagination is applied.
        - `type`: Type of data to retrieve (e.g., 'temperature', 'humidity', 'wind').
        - `page`: Page number for pagination.
        - `limit`: Number of records per page.
        - `sort`: Field to sort by (e.g., 'date', 'type').
    */
    try {
        const result = await getStationData(req.params.code, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});


/**
 * @swagger
 * /stations/{code}/batch:
 *   post:
 *     summary: Receive batch data
 *     description: Receive a batch of sensor data for a specific station.
 *     tags:
 *       - Stations
 *     responses:
 *       201:
 *         description: Batch data received successfully
 *       400:
 *         description: Invalid input data format
 */
router.post('/:code/batch', async(req, res) => {
    try {
        const result = await receiveBatchData(req.body);
        res.status(201).json(req.body);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;
