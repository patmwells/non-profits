import express from 'express';
import config from './config';
import { server } from './server';

/**
 *
 */
const port = config.port();

/**
 *
 */
server(express(), config).listen(port, () => {
    console.log('-> Server running on port:', port);
});