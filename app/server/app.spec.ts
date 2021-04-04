import { request, expect } from '../test/chai';
import { createTestApp, getDevHTML, getProdHTML } from '../test/helpers';

describe('App Specification', () => {

    it('should return 404 for the /favicon.ico route', () => {
        const app = createTestApp({ NODE_ENV: 'development', SERVER_PORT: 3000 });

        return request(app)
            .get('/favicon.ico')
            .then((response) => {
                expect(response).to.have.status(404);
            });
    });

    it('(Dev) Should return 200 and the correct html for the / route', () => {
        const app = createTestApp({ NODE_ENV: 'development', SERVER_PORT: 3000 });

        return request(app)
            .get('/')
            .then((response) => {
                expect(response).to.have.status(200);
                expect(response.text).to.be.eq(getDevHTML());
            });
    });

    it('(Prod) Should return 200 and the correct html for the / route', () => {
        const app = createTestApp({ NODE_ENV: 'production', SERVER_PORT: 3000 });

        return request(app)
            .get('/')
            .then((response) => {
                expect(response).to.have.status(200);
                expect(response.text).to.be.eq(getProdHTML());
            });
    });

});