import type { Application } from 'express';
import express from 'express';

import type { AppConfig, ServerConfig } from './types';
import { ApiRoutes, ServerRoutes } from './types/routes';
import { getSSRContent } from './ssr';
import { getPageHTML } from './view';
import { getGeocoderConfigs } from './census';
import { getCensusRouter, getFaviconRouter, getViewRouter } from './routes';
import { logger } from './middleware';

/**
 *
 * @param config
 */
export function createServerConfig(config: AppConfig): ServerConfig {
    return {
        config,
        apiRoutes: ApiRoutes,
        serverRoutes: ServerRoutes,
        getGeocoderConfigs,
        getSSRContent,
        getPageHTML
    };
}

/**
 *
 * @param server
 */
export function createServer(server: ServerConfig): Application {
    const app = express();

    app.locals.server = server;
    app.use(logger);
    app.use(express.static(server.config.assets()));
    app.use(getFaviconRouter(server));
    app.use(getCensusRouter(server));
    app.use(getViewRouter(server));

    return app;
}
