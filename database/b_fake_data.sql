USE meteo;

-- Insert sample data into stations table
INSERT INTO stations (city, latitude, longitude, installation_date)
VALUES 
('Milan', 45.4642, 9.1900, '2024-10-01'),
('Como', 45.8100, 9.0852, '2024-08-15'),
('Bergamo', 45.6983, 9.6773, '2024-09-01'),
('Varese', 45.8205, 8.8257, '2024-09-05'),
('Monza', 45.5845, 9.2744, '2024-10-02'),
('Brescia', 45.5416, 10.2118, '2024-09-10'),
('Pavia', 45.1847, 9.1582, '2024-09-15'),
('Lecco', 45.8530, 9.3902, '2024-09-20'),
('Lodi', 45.3092, 9.5032, '2024-09-25'),
('Cremona', 45.1332, 10.0213, '2024-10-05');

-- Manually insert 3 random sensors per station
INSERT INTO sensors (id, station_code, type)
VALUES 
-- Milan station_code = 1
(UUID(), 1, 'temperature'),
(UUID(), 1, 'humidity'),
(UUID(), 1, 'wind'),

-- Como station_code = 2
(UUID(), 2, 'temperature'),
(UUID(), 2, 'humidity'),
(UUID(), 2, 'wind'),

-- Bergamo station_code = 3
(UUID(), 3, 'temperature'),
(UUID(), 3, 'humidity'),
(UUID(), 3, 'wind'),

-- Varese station_code = 4
(UUID(), 4, 'temperature'),
(UUID(), 4, 'humidity'),
(UUID(), 4, 'wind'),

-- Monza station_code = 5
(UUID(), 5, 'temperature'),
(UUID(), 5, 'humidity'),
(UUID(), 5, 'wind'),

-- Brescia station_code = 6
(UUID(), 6, 'temperature'),
(UUID(), 6, 'humidity'),
(UUID(), 6, 'wind'),

-- Pavia station_code = 7
(UUID(), 7, 'temperature'),
(UUID(), 7, 'humidity'),
(UUID(), 7, 'wind'),

-- Lecco station_code = 8
(UUID(), 8, 'temperature'),
(UUID(), 8, 'humidity'),
(UUID(), 8, 'wind'),

-- Lodi station_code = 9
(UUID(), 9, 'temperature'),
(UUID(), 9, 'humidity'),
(UUID(), 9, 'wind'),

-- Cremona station_code = 10
(UUID(), 10, 'temperature'),
(UUID(), 10, 'humidity'),
(UUID(), 10, 'wind');


-- Insert data for temperature sensors
INSERT INTO sensors_data (sensor_id, station_code, date, type, measurement, unit)
SELECT id, station_code, NOW(), 'temperature', ROUND(RAND() * (35.0 - 20.0) + 20.0, 2), 'Celsius' FROM sensors WHERE type = 'temperature';
INSERT INTO sensors_data (sensor_id, station_code, date, type, measurement, unit)
SELECT id, station_code, DATE_ADD(NOW(), INTERVAL 1 MINUTE), 'temperature', ROUND(RAND() * (35.0 - 20.0) + 20.0, 2), 'Celsius' FROM sensors WHERE type = 'temperature';
INSERT INTO sensors_data (sensor_id, station_code, date, type, measurement, unit)
SELECT id, station_code, DATE_ADD(NOW(), INTERVAL 2 MINUTE), 'temperature', ROUND(RAND() * (35.0 - 20.0) + 20.0, 2), 'Celsius' FROM sensors WHERE type = 'temperature';

-- Insert data for humidity sensors
INSERT INTO sensors_data (sensor_id, station_code, date, type, measurement, unit)
SELECT id, station_code, NOW(), 'humidity', ROUND(RAND() * (90.0 - 30.0) + 30.0, 2), '%' FROM sensors WHERE type = 'humidity';
INSERT INTO sensors_data (sensor_id, station_code, date, type, measurement, unit)
SELECT id, station_code, DATE_ADD(NOW(), INTERVAL 1 MINUTE), 'humidity', ROUND(RAND() * (90.0 - 30.0) + 30.0, 2), '%' FROM sensors WHERE type = 'humidity';
INSERT INTO sensors_data (sensor_id, station_code, date, type, measurement, unit)
SELECT id, station_code, DATE_ADD(NOW(), INTERVAL 2 MINUTE), 'humidity', ROUND(RAND() * (90.0 - 30.0) + 30.0, 2), '%' FROM sensors WHERE type = 'humidity';

-- Insert data for wind sensors
INSERT INTO sensors_data (sensor_id, station_code, date, type, measurement, unit)
SELECT id, station_code, NOW(), 'wind', ROUND(RAND() * (15.0 - 0.0) + 0.0, 2), 'm/s' FROM sensors WHERE type = 'wind';
INSERT INTO sensors_data (sensor_id, station_code, date, type, measurement, unit)
SELECT id, station_code, DATE_ADD(NOW(), INTERVAL 1 MINUTE), 'wind', ROUND(RAND() * (15.0 - 0.0) + 0.0, 2), 'm/s' FROM sensors WHERE type = 'wind';
INSERT INTO sensors_data (sensor_id, station_code, date, type, measurement, unit)
SELECT id, station_code, DATE_ADD(NOW(), INTERVAL 2 MINUTE), 'wind', ROUND(RAND() * (15.0 - 0.0) + 0.0, 2), 'm/s' FROM sensors WHERE type = 'wind';