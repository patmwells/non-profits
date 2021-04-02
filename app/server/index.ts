import express from 'express';
import { createServer } from './server';
import { getServerConfig, getServerPort } from './config';

/**
 *
 */
const app = express();
const config = getServerConfig();
const port = getServerPort(config);
const server = createServer(app, config);

server.listen(port, () => console.log('-> Server running on port:', port));