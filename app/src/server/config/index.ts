import type { AppConfig } from './types';
import buildConfig from '../../../build/config';
import { ConfigNamespace } from '../../common/types/clientConfig';

/**
 *
 */
export type Config = (accessKey: symbol) => AppConfig;

/**
 *
 */
const key = Symbol();

/**
 *
 */
export function createConfig(): Config {
    const appConfig: AppConfig = {
        build: {
            clientAssets: buildConfig.client.output.path,
            clientScript: buildConfig.client.output.filename,
            liveReload: process.env.NODE_ENV === 'production' ? '' : buildConfig.client.liveReload.script
        },
        client: {
            appRoot: 'appRoot'
        },
        env: {
            serverPort: process.env.SERVER_PORT
        }
    };

    return function get(accessKey: symbol): AppConfig {

        if (accessKey !== key) {
            throw new Error('Invalid property access!');
        }

        return appConfig;
    };
}

/**
 *
 * @param config
 */
export function getClientAssetsDir(config: Config): string {
    return config(key).build.clientAssets;
}

/**
 *
 * @param config
 */
export function getServerPort(config: Config): string {
    return config(key).env.serverPort;
}

/**
 *
 * @param config
 */
export function getClientHeaderScripts(config: Config): string {
    return `<script type="application/javascript" src=${config(key).build.liveReload}></script>`;
}

/**
 *
 * @param config
 */
export function getClientAppRoot(config: Config): string {
    return config(key).client.appRoot;
}

/**
 *
 * @param config
 */
export function getClientConfigScript(config: Config): string {
    return `
        <script type="application/javascript">
            window.${ConfigNamespace} = ${JSON.stringify(config(key).client)}
        </script>
    `;
}

/**
 *
 * @param config
 */
export function getClientFooterScripts(config: Config): string {
    return `<script type="application/javascript" src=${config(key).build.clientScript}></script>`;
}