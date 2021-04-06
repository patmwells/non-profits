import type { ServerConfig } from '../types';

/**
 *
 * @param server
 */
export function getPageHTML({ config, getSSRContent }: ServerConfig): string {
    const title = config.title();
    const liveReload = config.liveReload();
    const appRoot = config.clientAppRoot();
    const content = getSSRContent();
    const configNamespace = config.clientConfigNamespace();
    const clientConfig = config.clientConfig();
    const clientScript = config.clientScript();

    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <title>${title}</title>
                ${liveReload ? `<script type="application/javascript" src="${liveReload}"></script>` : ''}
            </head>
            <body>
                <div id="${appRoot}">${content}</div>
                <script type="application/javascript">
                    window.${configNamespace}=${JSON.stringify(clientConfig)}
                </script>
                <script type="application/javascript" src="${clientScript}"></script>
            </body>
        </html>
    `;
}
