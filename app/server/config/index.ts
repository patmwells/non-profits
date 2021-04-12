/**
 *
 */
export type createAppConfig = typeof createAppConfig;

/**
 *
 */
export interface AppConfig {
    assets: () => string;
    clientScript: () => string;
    isDevelopment: () => boolean;
    liveReload: () => string;
    port: () => string;
}

/**
 *
 */
interface BuildConfig {
    client: {
        output: {
            path: string;
            filename: string;
        };
        liveReload: {
            script: string;
        };
    };
}

/**
 *
 */
interface EnvConfig {
    NODE_ENV: string;
    SERVER_PORT: string;
}

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
export function createAppConfig(build: BuildConfig, env: EnvConfig | NodeJS.ProcessEnv): Config {
    return new Config(build, env as EnvConfig);
}
