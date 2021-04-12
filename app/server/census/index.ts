// https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.pdf
// https://geocoding.geo.census.gov/geocoder/benchmarks
// https://geocoding.geo.census.gov/geocoder/geographies/address?benchmark=Public_AR_Census2020&vintage=Census2020_Census2020&layers=10&format=json

/**
 *
 */
export type getGeocoderConfigs = typeof getGeocoderConfigs;

/**
 *
 */
enum ReturnType {
    geographies = 'geographies',
    locations = 'locations'
}

/**
 *
 */
enum SearchType {
    onelineaddress = 'onelineaddress',
    address = 'address',
    coordinates = 'coordinates'
}

/**
 *
 */
enum ConfigType {
    address = 'address',
    street = 'street',
    city = 'city',
    state = 'state',
    x = 'x',
    y = 'y'
}

/**
 *
 */
interface Config {
    type: ConfigType;
}

/**
 *
 */
type GeocoderConfig = {
    returntype: ReturnType;
    searchtype: SearchType[];
    configs: {
        [SearchType.onelineaddress]: Config[];
        [SearchType.address]: Config[];
        [SearchType.coordinates]: Config[];
    };
}

/**
 *
 */
const geographies = {
    returntype: ReturnType.geographies,
    searchtype: [
        SearchType.onelineaddress,
        SearchType.address,
        SearchType.coordinates
    ],
    configs: {
        [SearchType.onelineaddress]: [
            { type: ConfigType.address }
        ],
        [SearchType.address]: [
            { type: ConfigType.street },
            { type: ConfigType.city },
            { type: ConfigType.state }
        ],
        [SearchType.coordinates]: [
            { type: ConfigType.x },
            { type: ConfigType.y }
        ]
    }
};

/**
 *
 */
const locations = {
    returntype: ReturnType.locations,
    searchtype: [
        SearchType.onelineaddress,
        SearchType.address
    ],
    configs: {
        [SearchType.onelineaddress]: [
            { type: ConfigType.address }
        ],
        [SearchType.address]: [
            { type: ConfigType.street },
            { type: ConfigType.city },
            { type: ConfigType.state }
        ],
        [SearchType.coordinates]: null
    }
};

/**
 *
 */
export function getGeocoderConfigs(): GeocoderConfig[] {
    return [
        geographies,
        locations
    ];
}
