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
export interface GeocoderConfig {
    returnTypes: ReturnType[];
    returnTypeConfigs: Record<ReturnType, {
        searchTypes: SearchType[];
        searchTypeConfigs: {
            [SearchType.onelineaddress]: ConfigType[];
            [SearchType.address]: ConfigType[];
            [SearchType.coordinates]?: ConfigType[];
        };
    }>;
}

const GeocoderConfig: GeocoderConfig = {
    returnTypes: [ReturnType.locations, ReturnType.geographies],
    returnTypeConfigs: {
        [ReturnType.locations]: {
            searchTypes: [
                SearchType.onelineaddress,
                SearchType.address
            ],
            searchTypeConfigs: {
                [SearchType.onelineaddress]: [ConfigType.address],
                [SearchType.address]: [
                    ConfigType.street,
                    ConfigType.city,
                    ConfigType.state
                ]
            }
        },
        [ReturnType.geographies]: {
            searchTypes: [
                SearchType.onelineaddress,
                SearchType.address,
                SearchType.coordinates
            ],
            searchTypeConfigs: {
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
        }
    }
};

/**
 *
 */
export function getGeocoderConfigs(): GeocoderConfig {
    return GeocoderConfig;
}
