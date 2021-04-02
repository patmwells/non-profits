import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../public/scripts/components';
import type { Config } from '../config';

/**
 *
 */
function getSSRContent(): string {
    return ReactDOMServer.renderToString(<App />);
}

/**
 *
 * @param config
 */
export function getPageHTML(config: Config): string {
    return `
        <html lang="en">
            <head>
                <title>App</title>
                ${config.headerScripts()}
            </head>
            <body>
                <div id=${config.appRoot()}>${getSSRContent()}</div>
                <script type="application/javascript">
                    window.${config.clientNamespace()}=${JSON.stringify(config.clientConfig())}
                </script>
                ${config.footerScripts()}
            </body>
        </html>
    `;
}