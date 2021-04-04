import createApp from './app';
import { request, expect } from '../test/chai';
import { createTestConfig, getProdHTML } from '../test/helpers';

describe('App Specification', () => {

    it('should return 404 for the /favicon.ico route', () => {
        const config = createTestConfig({ NODE_ENV: 'production', SERVER_PORT: 3000 });
        const app = createApp(config);

        return request(app)
            .get('/favicon.ico')
            .then((response) => {
                expect(response).to.have.status(404);
            });
    });

    it('Should return 200 and the correct html for the / route', () => {
        const config = createTestConfig({ NODE_ENV: 'production', SERVER_PORT: 3000 });
        const app = createApp(config);

        return request(app)
            .get('/')
            .then((response) => {
                expect(response).to.have.status(200);
                expect(response.text).to.be.eq(getProdHTML());
            });
    });

});