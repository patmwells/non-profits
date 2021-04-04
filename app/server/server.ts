import type { Application } from 'express';
import express from 'express';

import type { AppConfig, ServerConfig } from './types';
import { getSSRContent } from './ssr';
import { getPageHTML } from './view';
import { favicon, render } from './controllers';

/**
 *
 * @param config
 */
function createServerConfig(config: AppConfig): ServerConfig {
    return {
        config,
        getSSRContent,
        getPageHTML
    };
}

/**
 *
 * @param config
 */
export function createAppServer(config: AppConfig): Application {
    const app = express();
    const server = createServerConfig(config);

    app.use(express.static(server.config.assets()));
    app.get('/favicon.ico', favicon);
    app.get('/*', render(server));

    return app;
}