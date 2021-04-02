import { getSSRContent } from './ssr';
import {
    Config,
    getAppRoot,
    getClientConfig,
    getConfigNamespace,
    getFooterScripts,
    getHeaderScripts
} from '../config';

/**
 *
 * @param config
 */
export function getPageHTML(config: Config): string {
    const headerScripts = getHeaderScripts(config);
    const appRoot = getAppRoot(config);
    const content = getSSRContent();
    const configNamespace = getConfigNamespace(config);
    const clientConfig = getClientConfig(config);
    const footerScripts = getFooterScripts(config);

    return `
        <html lang="en">
            <head>
                <title>App</title>
                ${headerScripts}
            </head>
            <body>
                <div id=${appRoot}>${content}</div>
                <script type="application/javascript">
                    window.${configNamespace}=${JSON.stringify(clientConfig)}
                </script>
                ${footerScripts}
            </body>
        </html>
    `;
}