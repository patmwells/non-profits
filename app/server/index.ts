import express from 'express';
import { createServer } from './server';
import { getServerConfig, getServerPort } from './config';

/**
 *
 */
const config = getServerConfig();
const port = getServerPort(config);

/**
 *
 */
const app = express();
const server = createServer(app, config);

/**
 *
 */
server.listen(port, () => console.log('-> Server running on port:', port));