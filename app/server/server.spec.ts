import type { Application } from 'express';

import { expect, request } from '../test/chai';

import type { EnvConfig } from './config';
import { createAppConfig } from './config';
import { createServer, createServerConfig, ServerConfig } from './server';

import { view } from './view/spec';
import { census } from './census/spec';

/**
 *
 */
export interface TestConfig {
    request: typeof request;
    expect: Chai.ExpectStatic;
    setup: (options: { env: Partial<EnvConfig>; config?: Partial<ServerConfig> }) => Application;
}

/**
 *
 */
const buildConfig = {
    client: {
        output: {
            path: 'bin/public',
            filename: 'scripts/index.bundle.js'
        },
        liveReload: {
            script: 'livereload.js'
        }
    }
};

/**
 *
 */
const TestConfig: TestConfig = {
    request,
    expect,
    setup({ env, config }): Application {
        const appConfig = createAppConfig(buildConfig, env);
        const serverConfig = Object.assign(createServerConfig(appConfig), config);

        return createServer(serverConfig);
    }
};

/**
 *
 */
describe('Server Specification', () => {

    view(TestConfig);

    census(TestConfig);
});
