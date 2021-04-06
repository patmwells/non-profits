import type { AppConfig, BuildConfig, ClientConfig, EnvConfig, ServerConfig } from '../types';

/**
 *
 */
class Config implements AppConfig {
    /**
     *
     */
    private readonly build: BuildConfig;
    private readonly env: EnvConfig;

    /**
     *
     * @param build
     * @param env
     */
    constructor(build: BuildConfig, env: EnvConfig) {
        this.build = build;
        this.env = env;
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
     * @param server
     */
    clientConfig(server: ServerConfig): ClientConfig {
        return {
            apiRoutes: server.apiRoutes,
            appRoot: 'appRoot',
            title: 'App',
            namespace: '__client_config__'
        };
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
