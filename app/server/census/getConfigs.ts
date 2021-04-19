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
    zip = 'zip',
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

/**
 *
 */
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
                    ConfigType.state,
                    ConfigType.zip
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
                    ConfigType.state,
                    ConfigType.zip
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
