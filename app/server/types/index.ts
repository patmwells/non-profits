import type { GeocoderConfig } from './census';
import type { ApiRoutes } from './routes';

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
