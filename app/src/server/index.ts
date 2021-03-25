import express from 'express';
import render from './render';
import {
    createServerConfig,
    getClientAssetsDir,
    getServerPort,
} from './config';

/**
 *
 */
function server() {
    const app = express();
    const config = createServerConfig();
    const port = getServerPort(config);
    const assetsDir = getClientAssetsDir(config);

    app.use(express.static(assetsDir));
    app.get('/*', (req, res) => {
        const html = render(config);

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