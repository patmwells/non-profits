import { request, expect } from '../test/chai';
import { buildConfig } from '../test/helpers';
import { createAppConfig } from './config';
import { createServer, createServerConfig } from './server';

describe('Server Specification', () => {

    it('should return 404 for the /favicon.ico route', () => {
        const config = createAppConfig(buildConfig, { NODE_ENV: 'production', SERVER_PORT: '3000' });
        const server = createServer(createServerConfig(config));

        return request(server).get('/favicon.ico').then((response) => {
            expect(response).to.have.status(404);
        });
    });

    it('should return 200 for the / route when NODE_ENV=development', () => {
        const config = createAppConfig(buildConfig, { NODE_ENV: 'development', SERVER_PORT: '3000' });
        const server = createServer(createServerConfig(config));

        return request(server).get('/').then((response) => {
            expect(response).to.have.status(200);
        });
    });

    it('should return 200 for the / route when NODE_ENV=production', () => {
        const config = createAppConfig(buildConfig, { NODE_ENV: 'production', SERVER_PORT: '3000' });
        const server = createServer(createServerConfig(config));

        return request(server).get('/').then((response) => {
            expect(response).to.have.status(200);
        });
    });
});
