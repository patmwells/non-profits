import buildConfig from '../build/config';
import type { EnvConfig } from './types';
import { createAppConfig } from './config';
import { createAppServer } from './server';

/**
 *
 */
const envConfig = process.env as unknown as EnvConfig;
const config = createAppConfig(buildConfig, envConfig);
const server = createAppServer(config);

/**
 *
 */
const port = config.port();

server.listen(port, () => {
    console.log('-> Server running on port:', port);
});