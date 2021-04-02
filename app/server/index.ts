import express from 'express';
import { getPageHTML } from './view';
import {
    getClientAssetsDir,
    getServerConfig,
    getServerPort
} from './config';

/**
 *
 */
function server() {
    const app = express();
    const config = getServerConfig();
    const port = getServerPort(config);

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

    app.listen(port, () => console.log('-> Server running on port:', port));
}

/**
 *
 */
server();