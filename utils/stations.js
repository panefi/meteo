const stationsQueries = require('../database/queries/stations');

function validateSortingParameters(sort, sort_order) {
    allowed_sort_columns = ["code", "installation_date"]

    if (!allowed_sort_columns.includes(sort)) {
        sort = "code";
    }

    if (!["ASC", "DESC"].includes(sort_order)) {
        sort_order = "ASC";
    }

    return [sort, sort_order];
}


function buildStationsQuery(city, page, limit, sort, sort_order) {
    let filter_condition = "";
    const params = [];

    if (city) {
        filter_condition = `WHERE city="${city}"`;
    }

    const offset = (page - 1) * limit;
    params.push(limit, offset);

    const final_query = `
        SELECT * FROM stations ${filter_condition} 
        ORDER BY ${sort} ${sort_order} 
        LIMIT ${limit} OFFSET ${offset};
    `;


    return [final_query, params];

}

function updateStationInDb(code, data) {
    const validFields = ['city', 'latitude', 'longitude', 'installation_date'];
    let updateParts = [];
    let params = [];

    for (const [field, value] of Object.entries(data)) {
        if (validFields.includes(field)) {
            updateParts.push(`${field} = ?`);
            params.push(value);
        }
    }

    if (updateParts.length === 0) {
        throw new Error('No valid fields provided for update');
    }

    const finalQuery = `UPDATE stations SET ${updateParts.join(', ')} WHERE code = ?`;
    params.push(code);

    return [finalQuery, params];
}

function getForecastForNextDay(code) {
    const day = new Date();
    day.setDate(day.getDate() + 1);

    // Build the date string in YYYY-MM-DD format
    const year = day.getFullYear();
    const month = (day.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const date = day.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${date}`;

    const forecastQuery = stationsQueries.GET_FORECAST;

    return [forecastQuery, [code, formattedDate]];
}

function buildPaginatedQuery(code, data) {
    let query = `SELECT * FROM sensors_data WHERE station_code = ${code}`;
    let params = [code];

    if (data.date_from) {
        query += ` AND date >= "${data.date_from}"`;
        params.push(data.date_from);
    }

    if (data.date_to) {
        query += ` AND date <= "${data.date_to}"`;
        params.push(data.date_to);
    }

    if (data.type) {
        if (!['wind', 'humidity', 'temperature'].includes(data.type)) {
            throw new Error('Invalid type');
        }

        query += ` AND type = "${data.type}"`;
        params.push(data.type);
    }

    if (['date', 'type'].includes(data.sort)) {
        query += ` ORDER BY ${data.sort}`;
    }
    else {
        throw new Error('Invalid sort parameter');
    }

    let offset = (data.page - 1) * data.limit;
    query += ` LIMIT ${data.limit} OFFSET ${offset}`;
    params.push(data.limit, offset);

    return [query, params];
}

function getStationDataSummaryOrPaginated(code, data) {
    if (data.summary) {
        const summaryQuery = stationsQueries.GET_STATION_DATA_SUMMARY;
        return [summaryQuery, [code]];
    } else {
        const [paginatedQuery, params] = buildPaginatedQuery(code, data);
        return [paginatedQuery, params];
    }
}

module.exports = {
    validateSortingParameters,
    buildStationsQuery,
    updateStationInDb,
    getForecastForNextDay,
    getStationDataSummaryOrPaginated
}