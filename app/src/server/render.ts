import { createFooterScripts, createHeaderScripts, ServerConfig } from './config';
import { renderAppOnServer } from '../common/renderApp';

/**
 *
 * @param serverConfig
 */
export default function render(serverConfig: ServerConfig): string {
    return `
        <html lang="en">
            <head>
                <title>App</title>
                ${createHeaderScripts(serverConfig)}
            </head>
            <body>
                ${renderAppOnServer()}
                ${createFooterScripts(serverConfig)}
            </body>
        </html>
    `;
}