import type React from 'react';
import type { AxiosStatic } from 'axios';

/**
 *
 */
export interface ClientApiRoutes {
    geocoderConfigs: string;
}

/**
 *
 */
export interface ClientApi {
    getGeocoderConfigs: () => Promise<unknown>;
}

/**
 *
 */
interface ClientRenderConfig {
    appRoot: string;
    headerScript?: string;
    clientScript?: string;
    title?: string;
    namespace?: string;
}

/**
 *
 */
interface ClientConfigFromServer {
    apiRoutes: ClientApiRoutes;
}

/**
 *
 */
export interface ClientConfig {
    renderConfig: ClientRenderConfig;
    config: ClientConfigFromServer;
}

/**
 *
 */
export interface Client {
    request: AxiosStatic;
    renderConfig: ClientRenderConfig;
    config: ClientConfigFromServer;
    createClientApi: (client: Client) => ClientApi;
    renderOnClient: (client: Client) => void;
    renderOnServer: (client: Client) => string;
    App: React.FunctionComponent<{ config: { api: ClientApi } }>;
    Html: React.FunctionComponent<{ client: Client; content: string }>;
}
