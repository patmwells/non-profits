import type { Application } from 'express';
import express from 'express';

import { favicon, render } from './controllers';

import type { Server } from './types';
import { getSSRContent } from './ssr';
import { getPageHTML } from './view';
import {
    assets,
    clientAppRoot,
    clientConfigNamespace,
    clientConfig,
    clientScript,
    isDevelopment,
    liveReload,
    port,
    title
} from './config';

/**
 *
 */
export const server: Server = {
    assets,
    clientAppRoot,
    clientConfigNamespace,
    clientScript,
    clientConfig,
    isDevelopment,
    liveReload,
    port,
    title,
    getSSRContent,
    getPageHTML
};

/**
 *
 * @param app
 * @param server
 */
export function configure(app: Application, server: Server): Application {
    return app
        .use(express.static(server.assets()))
        .get('/favicon.ico', favicon)
        .get('/*', render(server));
}