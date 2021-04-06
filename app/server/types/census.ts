/**
 *
 */
export enum ReturnType {
    geographies = 'geographies',
    locations = 'locations'
}

/**
 *
 */
export enum SearchType {
    onelineaddress = 'onelineaddress',
    address = 'address',
    coordinates = 'coordinates'
}

/**
 *
 */
export enum ConfigType {
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
export interface GeocoderConfig {
    returntype: ReturnType;
    searchtype: SearchType[];
    configs: {
        [SearchType.onelineaddress]: Config[];
        [SearchType.address]: Config[];
        [SearchType.coordinates]?: Config[];
    };
}
