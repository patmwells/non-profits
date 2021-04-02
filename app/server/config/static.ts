import buildConfig from '../../build/config';

/**
 *
 */
type Build = {
    clientAssets: string;
    clientScript: string;
    liveReload: string;
};

const Build: Build = {
    clientAssets: buildConfig.client.output.path,
    clientScript: buildConfig.client.output.filename,
    liveReload: buildConfig.client.liveReload.script
};

/**
 *
 */
type Client = {
    appRoot: 'appRoot';
    configNamespace: '__client_config__';
};

const Client: Client = {
    appRoot: 'appRoot',
    configNamespace: '__client_config__'
};

/**
 *
 */
type Env = {
    isDevelopment: boolean;
    serverPort: string;
};

const Env: Env = {
    serverPort: process.env.SERVER_PORT,
    isDevelopment: process.env.NODE_ENV === 'development'
};

/**
 *
 */
export function assets(): string {
    return Build.clientAssets;
}

/**
 *
 */
export function port(): string {
    return Env.serverPort;
}

/**
 *
 */
export function headerScripts(): string {
    return Env.isDevelopment
        ? `<script type="application/javascript" src=${Build.liveReload}></script>`
        : '';
}

/**
 *
 */
export function footerScripts(): string {
    return `<script type="application/javascript" src=${Build.clientScript}></script>`;
}

/**
 *
 */
export function appRoot(): string {
    return Client.appRoot;
}

/**
 *
 */
export function clientNamespace(): string {
    return Client.configNamespace;
}

/**
 *
 */
export function clientConfig(): Client {
    return Object.assign({}, Client, {}) as Client;
}