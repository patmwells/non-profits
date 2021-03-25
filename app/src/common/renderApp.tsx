import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import App from './components';
import { createClientConfig, getAppRoot } from '../client/config';

/**
 *
 */
export const ConfigNamespace = '__client_config__';

/**
 *
 * @param window
 */
export function renderAppOnClient(window: Window): void {
    const config = window[ConfigNamespace];

    delete window[ConfigNamespace];

    const appRoot = getAppRoot(config);

    ReactDOM.hydrate(<App />, window.document.getElementById(appRoot));
}

/**
 *
 */
export function renderAppOnServer(): string {
    const config = createClientConfig();
    const content = ReactDOMServer.renderToString(<App />);

    return `
        <div id=${getAppRoot(config)}>${content}</div>
        <script type="application/javascript">
            window.${ConfigNamespace}=${JSON.stringify(config)}
        </script>
    `;
}