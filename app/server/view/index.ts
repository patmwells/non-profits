import type { ServerConfig } from '../types';

/**
 *
 * @param server
 */
export function getPageHTML(server: ServerConfig): string {
    const { config, getSSRContent } = server;
    const liveReload = config.liveReload();
    const content = getSSRContent();
    const clientConfig = config.clientConfig(server);
    const clientScript = config.clientScript();

    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>${clientConfig.title}</title>
                ${liveReload ? `<script type="application/javascript" src="${liveReload}"></script>` : ''}
            </head>
            <body>
                <div id="${clientConfig.appRoot}">${content}</div>
                <script type="application/javascript">
                    window.${clientConfig.namespace}=${JSON.stringify(clientConfig)}
                </script>
                <script type="application/javascript" src="${clientScript}"></script>
            </body>
        </html>
    `;
}
