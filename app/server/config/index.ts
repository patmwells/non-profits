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
const build: Build = {
    clientAssets: buildConfig.client.output.path,
    clientScript: buildConfig.client.output.filename,
    liveReload: buildConfig.client.liveReload.script
};

/**
 *
 */
export type Client = {
    appRoot: string;
    title: string;
    namespace: string;
};

/**
 *
 */
const client: Client = {
    appRoot: 'appRoot',
    title: 'App',
    namespace: '__client_config__',
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
const env: Env = {
    serverPort: process.env.SERVER_PORT,
    isDevelopment: process.env.NODE_ENV === 'development'
};

/**
 *
 */
export function assets(): string {
    return build.clientAssets;
}

/**
 *
 */
export function liveReload(): string {
    return isDevelopment() ? build.liveReload : '';
}

/**
 *
 */
export function clientScript(): string {
    return build.clientScript;
}

/**
 *
 */
export function clientConfig(): Client {
    return Object.assign({}, client, {}) as Client;
}

/**
 *
 */
export function clientConfigNamespace(): string {
    return client.namespace;
}

/**
 *
 */
export function title(): string {
    return client.title;
}

/**
 *
 */
export function clientAppRoot(): string {
    return client.appRoot;
}

/**
 *
 */
export function isDevelopment(): boolean {
    return env.isDevelopment;
}

/**
 *
 */
export function port(): string {
    return env.serverPort;
}