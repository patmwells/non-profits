import axios from 'axios';
import type { ClientApiRoutes, ClientConfig } from './types';
import App from './components/App';
import Html from './components/Html';
import { getSSRPage } from './ssr';
import { fetchGeocoderConfig } from './api';

/**
 *
 */
const serverToClientNamespace = '__client_config__';

/**
 *
 */
export function getClientConfigFromWindow(window: Window): ClientConfig {
    const configFromServer = window[serverToClientNamespace];

    delete window[serverToClientNamespace];

    return createClientConfig(configFromServer.apiRoutes);
}

/**
 *
 * @param apiRoutes
 */
export function createClientConfig(apiRoutes: ClientApiRoutes): ClientConfig {
    return {
        App,
        Html,
        appRoot: 'appRoot',
        title: 'App',
        namespace: serverToClientNamespace,
        apiRoutes,
        request: axios,
        getSSRPage,
        fetchGeocoderConfig
    };
}
