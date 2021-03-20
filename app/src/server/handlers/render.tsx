import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../../client/components/App';
import type { Config } from '../config';
import {
    getClientAppRoot,
    getClientConfigScript,
    getClientFooterScripts,
    getClientHeaderScripts
} from '../config';

/**
 *
 * @param config
 */
export function render(config: Config): string {
    const app = ReactDOMServer.renderToString(<App />);

    return `
        <html lang="en">
            <head>
                <title>App</title>
                ${getClientHeaderScripts(config)}
            </head>
            <body>
                <div id=${getClientAppRoot(config)}>${app}</div>
                ${getClientConfigScript(config)}
                ${getClientFooterScripts(config)}
            </body>
        </html>
    `;
}