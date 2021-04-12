/**
 *
 */
export interface ReturnType {
    geographies: 'geographies';
    locations: 'locations';
}

/**
 *
 */
type ReturnTypes = ReturnType[keyof ReturnType];

/**
 *
 */
export interface SearchType {
    onelineaddress: 'onelineaddress';
    address: 'address';
    coordinates: 'coordinates';
}

/**
 *
 */
type SearchTypes = SearchType[keyof SearchType];

/**
 *
 */
export interface ConfigType {
    address: 'address';
    street: 'street';
    city: 'city';
    state: 'state';
    x: 'x';
    y: 'y';
}

/**
 *
 */
type ConfigTypes = ConfigType[keyof ConfigType];

/**
 *
 */
interface Config {
    type: ConfigTypes;
}

/**
 *
 */
export type GeocoderConfig = {
    returntype: ReturnTypes;
    searchtype: SearchTypes[];
    configs: Record<SearchTypes, Config[]>;
}


/**
 *
 */
export interface ApiRoutes {
    geocoderConfigs: string;
}

/**
 *
 */
export interface BuildConfig {
    client: {
        output: {
            path: string;
            filename: string;
        };
        liveReload: {
            script: string;
        };
    };
}

/**
 *
 */
export interface EnvConfig {
    NODE_ENV: string;
    SERVER_PORT: string;
}

/**
 *
 */
export interface AppConfig {
    assets: () => string;
    clientScript: () => string;
    isDevelopment: () => boolean;
    liveReload: () => string;
    port: () => string;
}

/**
 *
 */
export interface ServerConfig {
    config: AppConfig;
    apiRoutes: ApiRoutes;
    getClientView: (server: ServerConfig) => string;
    getGeocoderConfigs: () => GeocoderConfig[];
}
