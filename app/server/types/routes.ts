/**
 *
 */
export enum ServerRoutes {
    favicon = '/favicon.ico',
    view = '/*'
}
export type ServerRoutesType = typeof ServerRoutes;

/**
 *
 */
export enum ApiRoutes {
    geocoderConfigs = '/api/v1/census/geocoder/configs'
}
export type ApiRoutesType = typeof ApiRoutes;
