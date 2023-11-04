function buildQueryParams(query: { [name: string]: any }) {
    const queryString = Object
        .entries(query)
        .filter(el => el[1])
        .map(el => `${el[0]}=${el[1]}`)
        .join('&');
    return queryString.length ? `?${queryString}` : '';
}

export default function () {
    return {
        buildQueryParams
    };
}
