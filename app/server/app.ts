import type { Application } from 'express';
import express from 'express';

import type { AppConfig } from './types';
import { createServerConfig, setServerConfig } from './server';
import { favicon, render } from './controllers';

/**
 *
 * @param config
 */
export function createApp(config: AppConfig): Application {
    const app = express();
    const server = createServerConfig(config);

    return setServerConfig(app, server)
        .use(express.static(server.config.assets()))
        .get('/favicon.ico', favicon)
        .get('/*', render);
}