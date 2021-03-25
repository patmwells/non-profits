import buildConfig from '../../build/config';

/**
 *
 */
export type ServerConfig = {
    serverPort: string;
    clientAssets: string;
    clientScript: string;
    liveReload: string;
};

/**
 *
 */
export function createServerConfig(): ServerConfig {
    return {
        serverPort: process.env.SERVER_PORT,
        clientAssets: buildConfig.client.output.path,
        clientScript: buildConfig.client.output.filename,
        liveReload: process.env.NODE_ENV === 'production' ? '' : buildConfig.client.liveReload.script
    };
}

/**
 *
 * @param config
 */
export function getClientAssetsDir(config: ServerConfig): string {
    return config.clientAssets;
}

/**
 *
 * @param config
 */
export function getServerPort(config: ServerConfig): string {
    return config.serverPort;
}

/**
 *
 * @param config
 */
export function createHeaderScripts(config: ServerConfig): string {
    return config.liveReload ? `<script type="application/javascript" src=${config.liveReload}></script>` : '';
}

/**
 *
 * @param config
 */
export function createFooterScripts(config: ServerConfig): string {
    return `<script type="application/javascript" src=${config.clientScript}></script>`;
}