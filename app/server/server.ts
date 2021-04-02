import express, { Application } from 'express';
import { Config, getClientAssetsDir } from './config';
import { getPageHTML } from './view';

/**
 *
 * @param app
 * @param config
 */
export function createServer(app: Application, config: Config): Application {

    app.use(express.static(getClientAssetsDir(config)));

    app.get('/favicon.ico', (req, res) => {
        res.status(404);
        res.end();
    });

    app.get('/*', (req, res) => {
        const html = getPageHTML(config);

        res.status(200);
        res.write(html);
        res.end();
    });

    return app;
}