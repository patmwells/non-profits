import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../../client/components/App';
import config from '../config';
import { getScriptElements } from './utils';
import { getClientConfigScript } from '../../common/clientConfig';

const clientConfig = {
    appRoot: config.CLIENT_APP_ROOT
};

export default function render(): string {
    const headerScripts: string = getScriptElements(config.HEADER_SCRIPTS);
    const configScript: string = getClientConfigScript(clientConfig);
    const footerScripts: string = getScriptElements(config.FOOTER_SCRIPTS);
    const app: string = ReactDOMServer.renderToString(<App />);

    return `
        <html lang="en">
            <head>
                <title>App</title>
                ${headerScripts}
            </head>
            <body>
                <div id=${clientConfig.appRoot}>${app}</div>
                ${configScript}
                ${footerScripts}
            </body>
        </html>
    `;
}