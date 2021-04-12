import type { Application } from 'express';
import express from 'express';

import type { AppConfig } from './config';
import { getClientView } from './view';
import { getGeocoderConfigs } from './census';
import { logger } from './middleware';
import { apiRoutes, getCensusRouter, getFaviconRouter, getViewRouter } from './routes';

/**
 *
 */
export type createServerConfig = typeof createServerConfig;
export type createServer = typeof createServer;

/**
 *
 */
export interface ServerConfig {
    config: AppConfig;
    apiRoutes: apiRoutes;
    getClientView: getClientView;
    getGeocoderConfigs: getGeocoderConfigs;
}

/**
 *
 * @param config
 */
export function createServerConfig(config: AppConfig): ServerConfig {
    return {
        config,
        apiRoutes,
        getClientView,
        getGeocoderConfigs
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
    app.use(getFaviconRouter());
    app.use(getCensusRouter());
    app.use(getViewRouter());

    return app;
}
