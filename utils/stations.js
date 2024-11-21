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



module.exports = {
    validateSortingParameters,
    buildStationsQuery,
    updateStationInDb
}