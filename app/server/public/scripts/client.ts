import axios from 'axios';
import type { Client, ClientApiRoutes } from './types';
import { App } from './app';
import { Html } from './ssr/Html';
import { createClientApi } from './api';
import { renderOnClient, renderOnServer } from './render';

/**
 *
 * @param window
 */
export function getClient(window: Window): Client {
    return {
        request: axios,
        config: window['__client_config__'],
        createClientApi,
        renderOnClient,
        App,
        Html
    };
}

/**
 *
 */
interface SSRClientOptions {
    headerScript: string;
    clientScript: string;
    apiRoutes: ClientApiRoutes;
}

/**
 *
 * @param headerScript
 * @param clientScript
 * @param apiRoutes
 */
export function getSSRClient({ headerScript, clientScript, apiRoutes }: SSRClientOptions): Client {
    return {
        request: axios,
        headerScript,
        clientScript,
        config: {
            appRoot: 'appRoot',
            title: 'App',
            namespace: '__client_config__',
            apiRoutes
        },
        createClientApi,
        renderOnServer,
        App,
        Html
    };
}
