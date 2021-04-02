import express from 'express';
import { create, configure } from './server';

const app = express();
const server = create();
const port = server.port();

configure(app, server).listen(port, () => console.log('-> Server running on port:', port));