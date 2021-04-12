// https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.pdf
// https://geocoding.geo.census.gov/geocoder/benchmarks
// https://geocoding.geo.census.gov/geocoder/geographies/address?benchmark=Public_AR_Census2020&vintage=Census2020_Census2020&layers=10&format=json

import type { ReturnType, SearchType, GeocoderConfig, ConfigType } from '@server/types';

const returnType: ReturnType = {
    geographies: 'geographies',
    locations: 'locations'
};

const searchType: SearchType = {
    onelineaddress: 'onelineaddress',
    address: 'address',
    coordinates: 'coordinates'
};

const configType: ConfigType = {
    address: 'address',
    street: 'street',
    city: 'city',
    state: 'state',
    x: 'x',
    y: 'y'
};

/**
 *
 */
const geographies = {
    returntype: returnType.geographies,
    searchtype: [
        searchType.onelineaddress,
        searchType.address,
        searchType.coordinates
    ],
    configs: {
        [searchType.onelineaddress]: [
            { type: configType.address }
        ],
        [searchType.address]: [
            { type: configType.street },
            { type: configType.city },
            { type: configType.state }
        ],
        [searchType.coordinates]: [
            { type: configType.x },
            { type: configType.y }
        ]
    }
};

/**
 *
 */
const locations = {
    returntype: returnType.locations,
    searchtype: [
        searchType.onelineaddress,
        searchType.address
    ],
    configs: {
        [searchType.onelineaddress]: [
            { type: configType.address }
        ],
        [searchType.address]: [
            { type: configType.street },
            { type: configType.city },
            { type: configType.state }
        ],
        [searchType.coordinates]: null
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
