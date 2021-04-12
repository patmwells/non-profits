import axios from 'axios';
import type { Client, ClientApiRoutes, ClientConfig } from '@client/types';
import { App } from './app';
import { Html } from './ssr';
import { createClientApi } from './api';
import { renderOnClient, renderOnServer } from './render';

/**
 *
 */
const AppTitle = 'App';
const AppRoot = 'appRoot';
const ClientNamespace = '__client_config__';

/**
 *
 * @param window
 */
export function getClientConfig(window: Window): ClientConfig {
    return {
        renderConfig: {
            appRoot: AppRoot
        },
        config: window[ClientNamespace]
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
export function getSSRClientConfig({ headerScript, clientScript, apiRoutes }: SSRClientOptions): ClientConfig {
    return {
        renderConfig: {
            headerScript,
            clientScript,
            appRoot: AppRoot,
            title: AppTitle,
            namespace: ClientNamespace
        },
        config: {
            apiRoutes
        }
    };
}

/**
 *
 * @param config
 * @param renderConfig
 */
export function createClient({ config, renderConfig }: ClientConfig): Client {
    return {
        request: axios,
        renderConfig,
        config,
        createClientApi,
        renderOnServer,
        renderOnClient,
        App,
        Html
    };
}
