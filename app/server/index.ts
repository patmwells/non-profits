import type { EnvConfig } from './types';
import buildConfig from '../build/config';
import { createAppConfig } from './config';
import { createServer, createServerConfig } from './server';

/**
 *
 */
const envConfig = process.env as unknown as EnvConfig;
const config = createAppConfig(buildConfig, envConfig);
const server = createServer(createServerConfig(config));

/**
 *
 */
const port = config.port();

server.listen(port, () => {
    console.log('-> Server running on port:', port);
});
