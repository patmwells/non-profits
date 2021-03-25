import buildConfig from '../../../build/config';
import { ClientConfig, ConfigNamespace } from '../../common/types/clientConfig';

/**
 *
 */
type BuildConfig = {
    clientAssets: string;
    clientScript: string;
    liveReload: string;
};

/**
 *
 */
type ServerConfig = {
    serverPort: string;
};

/**
 *
 */
export type AppConfig = {
    build: BuildConfig;
    client: ClientConfig;
    server: ServerConfig;
};

/**
 *
 */
export function createConfig(): AppConfig {
    return {
        build: {
            clientAssets: buildConfig.client.output.path,
            clientScript: buildConfig.client.output.filename,
            liveReload: process.env.NODE_ENV === 'production' ? '' : buildConfig.client.liveReload.script
        },
        client: {
            appRoot: 'appRoot'
        },
        server: {
            serverPort: process.env.SERVER_PORT
        }
    };
}

/**
 *
 * @param config
 */
export function getClientAssetsDir(config: AppConfig): string {
    return config.build.clientAssets;
}

/**
 *
 * @param config
 */
export function getServerPort(config: AppConfig): string {
    return config.server.serverPort;
}

/**
 *
 * @param config
 * @param content
 */
export function getHtml(config: AppConfig, content: string): string {
    return `
        <html lang="en">
            <head>
                <title>App</title>
                <script type="application/javascript" src=${config.build.liveReload}></script>
            </head>
            <body>
                <div id=${config.client.appRoot}>${content}</div>
                <script type="application/javascript">
                    window.${ConfigNamespace} = ${JSON.stringify(config.client)}
                </script>
                <script type="application/javascript" src=${config.build.clientScript}></script>
            </body>
        </html>
    `;
}