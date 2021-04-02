import express, { Application } from 'express';
import type { Config } from './config';
import { favicon, render } from './controllers';

/**
 * 
 * @param app
 * @param config
 */
export function server(app: Application, config: Config): Application {
    return app
        .use(express.static(config.assets()))
        .get('/favicon.ico', favicon)
        .get('/*', render(config));
}