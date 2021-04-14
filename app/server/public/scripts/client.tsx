import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import axios, { AxiosStatic } from 'axios';
import { createClientApi } from './Api';
import { createStore } from './Store';
import { createApp } from './App';
import { Html } from './Html';

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
    renderOnClient: typeof renderOnClient;
    renderOnServer: typeof renderOnServer;
    createApp: createApp;
    createStore: createStore;
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
 * @param client
 */
function renderOnClient(client: Client): void {
    const api = client.createClientApi(client);
    const store = client.createStore(api);
    const app = client.createApp(store);

    ReactDOM.hydrate(<app.Component controller={app} />, document.getElementById(client.renderConfig.appRoot));
}

/**
 *
 * @param client
 */
function renderOnServer(client: Client): string {
    const api = client.createClientApi(client);
    const store = client.createStore(api);
    const app = client.createApp(store);
    const content = ReactDOMServer.renderToString(<app.Component controller={app} />);
    const markup = ReactDOMServer.renderToStaticMarkup(<client.Html client={client} content={content} />);

    return `<!DOCTYPE html>${markup}`;
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
        renderOnServer,
        renderOnClient,
        createClientApi,
        createStore,
        createApp,
        Html
    };
}
