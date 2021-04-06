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
    geocoderConfigs = '/census/geocoder/configs'
}
export type ApiRoutesType = typeof ApiRoutes;
