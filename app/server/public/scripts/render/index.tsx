import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import type { Client } from '../types';

/**
 *
 * @param client
 */
export function renderOnClient(client: Client): void {
    const api = client.createClientApi(client);

    ReactDOM.hydrate(<client.App config={{ api }} />, document.getElementById(client.config.appRoot));
}

/**
 *
 * @param client
 */
export function renderOnServer(client: Client): string {
    const api = client.createClientApi(client);
    const content = ReactDOMServer.renderToString(<client.App config={{ api }} />);
    const markup = ReactDOMServer.renderToString(<client.Html client={client} content={content} />);

    return `<!DOCTYPE html>${markup}`;
}
