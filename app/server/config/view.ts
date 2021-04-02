import type { Config } from './types';

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
                <div id=${config.appRoot()}>${config.getSSRContent()}</div>
                <script type="application/javascript">
                    window.${config.clientNamespace()}=${JSON.stringify(config.clientConfig())}
                </script>
                ${config.footerScripts()}
            </body>
        </html>
    `;
}