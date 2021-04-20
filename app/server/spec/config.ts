import type { Application } from 'express';
import { expect, request } from '../../test/chai';
import { createAppConfig, EnvConfig } from '../config';
import { createServer, createServerConfig, ServerConfig } from '../server';
import { BuildFixtures, CensusFixtures } from './fixtures';

/**
 *
 */
interface SetupOptions {
    env: Partial<EnvConfig>;
    config?: Partial<ServerConfig>;
}

/**
 *
 */
export interface TestConfig {
    request: typeof request;
    expect: Chai.ExpectStatic;
    setup: (options: SetupOptions) => Application;
    fixtures: {
        build: BuildFixtures;
        census: CensusFixtures;
    };
}

/**
 *
 */
export const TestConfig: TestConfig = {
    request,
    expect,
    fixtures: {
        build: BuildFixtures,
        census: CensusFixtures
    },
    setup({ env, config }: SetupOptions): Application {
        const appConfig = createAppConfig(TestConfig.fixtures.build.config, env);
        const serverConfig = Object.assign(createServerConfig(appConfig), config);

        return createServer(serverConfig);
    }
};
