import express from 'express';
import config from './config';
import html from './html';

function server(): void {
    const app = express();

    app.use(express.static(config.CLIENT_ASSETS));

    app.get('/*', (req, res) => {
        const content = html();

        res.status(200);
        res.send(content);
        res.end();
    });

    app.listen(config.SERVER_PORT);
}

/**
 * Start the server.
 */
server();