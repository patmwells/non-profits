import { Application, Response } from 'express';
import buildConfig from '../../build/config';

/**
 *
 */
type Build = {
    clientAssets: string;
    clientScript: string;
    liveReload: string;
};

/**
 *
 */
type Client = {
    appRoot: 'appRoot';
    configNamespace: '__client_config__';
};

/**
 *
 */
type Env = {
    isDevelopment: boolean;
    serverPort: string;
};

/**
 *
 */
export type Config = {
    build: Build;
    client: Client;
    env: Env;
};

/**
 *
 */
export function getServerConfig(): Config {
    return {
        build: {
            clientAssets: buildConfig.client.output.path,
            clientScript: buildConfig.client.output.filename,
            liveReload: buildConfig.client.liveReload.script
        },
        client: {
            appRoot: 'appRoot',
            configNamespace: '__client_config__'
        },
        env: {
            serverPort: process.env.SERVER_PORT,
            isDevelopment: process.env.NODE_ENV === 'development'
        }
    };
}

/**
 *
 * @param config
 */
export function getClientAssetsDir(config: Config): string {
    return config.build.clientAssets;
}

/**
 *
 * @param config
 */
export function getServerPort(config: Config): string {
    return config.env.serverPort;
}

/**
 *
 * @param config
 */
export function getHeaderScripts(config: Config): string {
    return config.env.isDevelopment
        ? `<script type="application/javascript" src=${config.build.liveReload}></script>`
        : '';
}

/**
 *
 * @param config
 */
export function getFooterScripts(config: Config): string {
    return `<script type="application/javascript" src=${config.build.clientScript}></script>`;
}

/**
 *
 * @param config
 */
export function getAppRoot(config: Config): string {
    return config.client.appRoot;
}

/**
 *
 * @param config
 */
export function getConfigNamespace(config: Config): string {
    return config.client.configNamespace;
}

/**
 *
 * @param config
 */
export function getClientConfig(config: Config): Client {
    return config.client;
}

/**
 *
 * @param app
 * @param config
 */
export function setAppConfig(app: Application, config: Config): Application {
    app.locals.config = config;
    return app;
}

/**
 *
 * @param res
 */
export function getAppConfig(res: Response): Config {
    return res.app.locals.config;
}
