import buildConfig from '../build/config';
import { createAppConfig } from './config';
import { createServer, createServerConfig } from './server';

/**
 *
 */
const config = createAppConfig(buildConfig, process.env);
const server = createServer(createServerConfig(config));

/**
 *
 */
const port = config.port();

server.listen(port, () => {
    console.log(process.env);
    console.log('-> Server running on port:', port);
});
