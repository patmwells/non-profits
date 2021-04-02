import express, { Application } from 'express';
import type { Config } from './config';
import { favicon } from './favicon';
import { render } from './view';

/**
 * 
 * @param app
 * @param config
 */
export function server(app: Application, config: Config): Application {

    app.locals.config = config;

    return app
        .use(express.static(config.assets()))
        .get('/favicon.ico', favicon)
        .get('/*', render);
}