import type React from 'react';
import type { AxiosStatic } from 'axios';

export interface ClientApiRoutes {
    geocoderConfigs: string;
}

export interface ClientApi {
    getGeocoderConfigs: () => Promise<unknown>;
}

interface ClientConfig {
    appRoot: string;
    title: string;
    namespace: string;
    apiRoutes: ClientApiRoutes;
}

export interface Client {
    request: AxiosStatic;
    headerScript?: string;
    clientScript?: string;
    config: ClientConfig;
    createClientApi: (client: Client) => ClientApi;
    renderOnClient?: (client: Client) => void;
    renderOnServer?: (client: Client) => string;
    App: React.FunctionComponent<{ config: { api: ClientApi } }>;
    Html: React.FunctionComponent<{ client: Client; content: string }>;
}
