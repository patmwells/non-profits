import type { AppConfig, BuildConfig, ClientConfig, EnvConfig } from '../types';

/**
 *
 */
class Config implements AppConfig {
    /**
     *
     */
    private readonly build: BuildConfig;
    private readonly client: ClientConfig;
    private readonly env: EnvConfig;

    /**
     *
     * @param build
     * @param env
     */
    constructor(build: BuildConfig, env: EnvConfig) {
        this.build = build;
        this.env = env;
        this.client = {
            appRoot: 'appRoot',
            title: 'App',
            namespace: '__client_config__',
        };
    }

    /**
     *
     */
    port(): string {
        return this.env.SERVER_PORT;
    }

    /**
     *
     */
    isDevelopment(): boolean {
        return this.env.NODE_ENV === 'development';
    }

    /**
     *
     */
    clientAppRoot(): string {
        return this.client.appRoot;
    }

    /**
     *
     */
    title(): string {
        return this.client.title;
    }

    /**
     *
     */
    clientConfigNamespace(): string {
        return this.client.namespace;
    }

    /**
     *
     */
    clientConfig(): ClientConfig {
        return Object.assign({}, this.client);
    }

    /**
     *
     */
    clientScript(): string {
        return this.build.client.output.filename;
    }

    /**
     *
     */
    liveReload(): string {
        return this.isDevelopment() ? this.build.client.liveReload.script : '';
    }

    /**
     *
     */
    assets(): string {
        return this.build.client.output.path;
    }
}

/**
 *
 * @param build
 * @param env
 */
export function createAppConfig(build: BuildConfig, env: EnvConfig): Config {
    return new Config(build, env);
}