CREATE_FORECAST = `
INSERT INTO forecast (date, station_code, type, measurement, unit)
VALUES (?, ?, ?, ?, ?);
`

GET_STATIONS = `
SELECT * FROM stations
{filter_condition}
ORDER BY {sort_column} {sort_order}
LIMIT ? OFFSET ?;
`

INSERT_STATION = `
INSERT INTO stations (city, latitude, longitude, installation_date)
VALUES (?, ?, ?, ?);
`

DELETE_STATION = `
DELETE FROM stations WHERE code = ?;
`

GET_STATION_DATA = `
SELECT * FROM sensors_data WHERE station_code = ?
{filter_condition}
ORDER BY {sort_column} {sort_order}
LIMIT ? OFFSET ?;
`

GET_FORECAST = `
SELECT *
FROM forecast
WHERE station_code = ? AND type IN ('humidity', 'temperature', 'wind') AND date = ?;
`

GET_STATION_DATA_SUMMARY = `
SELECT type, AVG(measurement) AS average_value
FROM sensors_data
WHERE station_code = ?
GROUP BY type;
`

CREATE_BATCH_SENSOR_DATA = `
INSERT INTO sensors_data (sensor_id, station_code, date, type, measurement, unit)
VALUES (?, ?, ?, ?, ?, ?)
`

module.exports = {
    CREATE_FORECAST,
    GET_STATIONS,
    INSERT_STATION,
    DELETE_STATION,
    GET_STATION_DATA,
    GET_FORECAST,
    GET_STATION_DATA_SUMMARY,
    CREATE_BATCH_SENSOR_DATA
}