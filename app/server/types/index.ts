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
    clientAppRoot: () => string;
    clientConfigNamespace: () => string;
    clientScript: () => string;
    clientConfig: () => ClientConfig;
    isDevelopment: () => boolean;
    liveReload: () => string;
    port: () => string;
    title: () => string;
}

/**
 *
 */
export interface GeocoderConfigs {
    returntype: string;
    searchtype: string[];
}

/**
 *
 */
export interface ServerConfig {
    config: AppConfig;
    getGeocoderConfigs: () => GeocoderConfigs[];
    getSSRContent: () => string;
    getPageHTML: (server: ServerConfig) => string;
}
