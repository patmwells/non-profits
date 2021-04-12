import axios, { AxiosStatic } from 'axios';
import { App } from './app';
import { Html } from './ssr';
import { createClientApi } from './api';
import { renderOnClient, renderOnServer } from './render';

/**
 *
 */
export type getClientConfig = typeof getClientConfig;
export type getSSRClientConfig = typeof getSSRClientConfig;
export type createClient = typeof createClient;

/**
 *
 */
export interface Client {
    request: AxiosStatic;
    renderConfig: ClientRenderConfig;
    config: ClientConfigFromServer;
    createClientApi: createClientApi;
    renderOnClient: renderOnClient;
    renderOnServer: renderOnServer;
    App: App;
    Html: Html;
}

/**
 *
 */
const AppTitle = 'App';
const AppRoot = 'appRoot';
const ClientNamespace = '__client_config__';

/**
 *
 */
interface ClientApiRoutes {
    geocoderConfigs: string;
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
 */
interface ClientConfigFromServer {
    apiRoutes: ClientApiRoutes;
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
interface ClientConfig {
    renderConfig: ClientRenderConfig;
    config: ClientConfigFromServer;
}

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
