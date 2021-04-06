import type { Application } from 'express';
import express from 'express';

import type { AppConfig, ServerConfig } from './types';
import { getSSRContent } from './ssr';
import { getPageHTML } from './view';
import { getGeocoderConfigs } from './census';
import { getCensusRouter, getFaviconRouter, getViewRouter } from './routes';

/**
 *
 * @param config
 */
export function createServerConfig(config: AppConfig): ServerConfig {
    return {
        config,
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
    app.use(express.static(server.config.assets()));
    app.use(getFaviconRouter());
    app.use('/api/v1', getCensusRouter());
    app.use(getViewRouter());

    return app;
}
