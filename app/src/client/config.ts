/**
 *
 */
export type ClientConfig = {
    appRoot: 'appRoot';
}

/**
 *
 */
export function createClientConfig(): ClientConfig {
    return {
        appRoot: 'appRoot'
    };
}

/**
 *
 * @param config
 */
export function getAppRoot(config: ClientConfig): string {
    return config.appRoot;
}