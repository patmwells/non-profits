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
function createServerConfig(config: AppConfig): ServerConfig {
    return {
        config,
        getGeocoderConfigs,
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
    app.use(getFaviconRouter());
    app.use('/api/v1', getCensusRouter(server));
    app.use(getViewRouter(server));

    return app;
}