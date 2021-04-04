import type { Application, Request } from 'express';
import type { AppConfig, ServerConfig } from './types';
import { getSSRContent } from './ssr';
import { getPageHTML } from './view';

/**
 *
 * @param config
 */
export function createServerConfig(config: AppConfig): ServerConfig {
    return {
        config,
        getSSRContent,
        getPageHTML
    };
}

/**
 *
 * @param app
 * @param server
 */
export function setServerConfig(app: Application, server: ServerConfig): Application {
    app.locals.server = server;

    return app;
}

/**
 *
 * @param req
 */
export function getServerConfig(req: Request): ServerConfig {
    return req.app.locals.server;
}