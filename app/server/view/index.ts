import type { Server } from '../types';

/**
 *
 * @param server
 */
export function getPageHTML(server : Server): string {
    const title = server.title();
    const liveReload = server.liveReload();
    const appRoot = server.clientAppRoot();
    const content = server.getSSRContent();
    const configNamespace = server.clientConfigNamespace();
    const clientConfig = server.clientConfig();
    const clientScript = server.clientScript();

    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>${title}</title>
                ${liveReload ? `<script type="application/javascript" src=${liveReload}></script>` : ''}
            </head>
            <body>
                <div id=${appRoot}>${content}</div>
                <script type="application/javascript">
                    window.${configNamespace}=${JSON.stringify(clientConfig)}
                </script>
                <script type="application/javascript" src=${clientScript}></script>
            </body>
        </html>
    `;
}