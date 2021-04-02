import express, { Application } from 'express';
import { Config, getClientAssetsDir, setAppConfig } from './config';
import { favicon, render } from './controllers';

/**
 *
 * @param app
 * @param config
 */
export function createServer(app: Application, config: Config): Application {

    const server = setAppConfig(app, config);

    server.use(express.static(getClientAssetsDir(config)));
    server.get('/favicon.ico', favicon);
    server.get('/*', render);

    return server;
}