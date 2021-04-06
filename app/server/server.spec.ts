import { createAppConfig } from './config';
import { createAppServer } from './server';
import { request, expect } from '../test/chai';
import { buildConfig, getDevHTML, getProdHTML } from '../test/helpers';

describe('Server Specification', () => {

    it('should return 404 for the /favicon.ico route', () => {
        const config = createAppConfig(buildConfig, { NODE_ENV: 'production', SERVER_PORT: '3000' });
        const server = createAppServer(config);

        return request(server).get('/favicon.ico').then((response) => {
            expect(response).to.have.status(404);
        });
    });

    it('should return 200 and the correct html for the / route when NODE_ENV=development', () => {
        const config = createAppConfig(buildConfig, { NODE_ENV: 'development', SERVER_PORT: '3000' });
        const server = createAppServer(config);

        return request(server).get('/').then((response) => {
            expect(response).to.have.status(200);
            expect(response.text).to.eq(getDevHTML());
        });
    });

    it('should return 200 and the correct html for the / route when NODE_ENV=production', () => {
        const config = createAppConfig(buildConfig, { NODE_ENV: 'production', SERVER_PORT: '3000' });
        const server = createAppServer(config);

        return request(server).get('/').then((response) => {
            expect(response).to.have.status(200);
            expect(response.text).to.eq(getProdHTML());
        });
    });

    describe('/api/v1 routes', () => {

        it('should return 200 and an array of GeocoderConfigs for the /census/geocoder/configs route', () => {
            const expected = [
                { returntype: 'geographies', searchtype: [ 'onelineaddress', 'address', 'coordinates' ] },
                { returntype: 'locations', searchtype: [ 'onelineaddress', 'address' ] }
            ];

            const config = createAppConfig(buildConfig, { NODE_ENV: 'production', SERVER_PORT: '3000' });
            const server = createAppServer(config);

            return request(server).get('/api/v1/census/geocoder/configs').then((response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.deep.eq(expected);
            });
        });

    });

});