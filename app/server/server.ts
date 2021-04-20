import type { Application } from 'express';
import type { AxiosStatic } from 'axios';
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

import type { AppConfig } from './config';
import { getClientView } from './view';
import { CensusGeocoder } from './census';
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
    request: AxiosStatic;
    config: AppConfig;
    apiRoutes: apiRoutes;
    getClientView: getClientView;
    CensusGeocoder: CensusGeocoder;
}

/**
 *
 * @param config
 */
export function createServerConfig(config: AppConfig): ServerConfig {
    return {
        request: axios,
        config,
        apiRoutes,
        getClientView,
        CensusGeocoder
    };
}

/**
 *
 * @param server
 */
export function createServer(server: ServerConfig): Application {
    const app = express();

    app.locals.server = server;
    app.use(bodyParser.json());
    app.use(logger);
    app.use(express.static(server.config.assets()));
    app.use(getFaviconRouter());
    app.use(getCensusRouter());
    app.use(getViewRouter());

    return app;
}
