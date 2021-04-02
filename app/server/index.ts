import express from 'express';
import { configure, server } from './server';

const app = configure(express(), server);
const port = server.port();

app.listen(port, () => console.log('-> Server running on port:', port));