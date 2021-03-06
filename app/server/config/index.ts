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
export interface EnvConfig {
    NODE_ENV: string;
    PORT: string;
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
        return this.env.PORT;
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
