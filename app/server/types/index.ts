import type { GeocoderConfig } from './census';
import type { ApiRoutesType, ServerRoutesType } from './routes';

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
export interface ClientConfig {
    apiRoutes: ApiRoutesType;
    appRoot: string;
    title: string;
    namespace: string;
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
    clientConfig: (server: ServerConfig) => ClientConfig;
    isDevelopment: () => boolean;
    liveReload: () => string;
    port: () => string;
}

/**
 *
 */
export interface ServerConfig {
    config: AppConfig;
    apiRoutes: ApiRoutesType;
    serverRoutes: ServerRoutesType;
    getGeocoderConfigs: () => GeocoderConfig[];
    getSSRContent: (clientConfig: ClientConfig) => string;
    getPageHTML: (server: ServerConfig) => string;
}
