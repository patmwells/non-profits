// https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.pdf
// https://geocoding.geo.census.gov/geocoder/benchmarks
// https://geocoding.geo.census.gov/geocoder/geographies/address?benchmark=Public_AR_Census2020&vintage=Census2020_Census2020&layers=10&format=json

import type { GeocoderConfig } from '../types/census';
import { ConfigType, ReturnType, SearchType } from '../types/census';

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
