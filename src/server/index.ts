import express from 'express';
import config from './config';
import render from './render';

const app = express();

app.use(express.static(config.CLIENT_ASSETS));

app.get('/*', (req, res) => {
    const html = render();

    res.status(200);
    res.send(html);
    res.end();
});

app.listen(config.SERVER_PORT);