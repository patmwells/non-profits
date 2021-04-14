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
type GeocoderConfig = {
    returntype: ReturnType;
    searchtype: SearchType[];
    configs: {
        [SearchType.onelineaddress]: ConfigType[];
        [SearchType.address]: ConfigType[];
        [SearchType.coordinates]?: ConfigType[];
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
        [SearchType.onelineaddress]: [ConfigType.address],
        [SearchType.address]: [
            ConfigType.street,
            ConfigType.city,
            ConfigType.state
        ],
        [SearchType.coordinates]: [
            ConfigType.x,
            ConfigType.y
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
        [SearchType.onelineaddress]: [ConfigType.address],
        [SearchType.address]: [
            ConfigType.street,
            ConfigType.city,
            ConfigType.state
        ]
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
