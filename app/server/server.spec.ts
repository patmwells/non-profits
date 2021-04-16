import { createAppConfig } from './config';
import { createServer, createServerConfig } from './server';
import { request, expect } from '../test/chai';
import { buildConfig } from '../test/helpers';

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

    describe('/api/v1 routes', () => {

        it('should return 200 and an array of GeocoderConfigs for the /census/geocoder/configs route', () => {
            const expected = {
                returnTypes: ['locations', 'geographies'],
                returnTypeConfigs: {
                    locations: {
                        searchTypes: [ 'onelineaddress', 'address' ],
                        searchTypeConfigs: {
                            onelineaddress: [ 'address' ],
                            address: [ 'street', 'city', 'state' ]
                        }
                    },
                    geographies: {
                        searchTypes: [ 'onelineaddress', 'address', 'coordinates' ],
                        searchTypeConfigs: {
                            onelineaddress: [ 'address' ],
                            address: [ 'street', 'city', 'state' ],
                            coordinates: [ 'x', 'y' ]
                        }
                    }
                }
            };

            const config = createAppConfig(buildConfig, { NODE_ENV: 'production', SERVER_PORT: '3000' });
            const server = createServer(createServerConfig(config));

            return request(server).get('/api/v1/census/geocoder/configs').then((response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.deep.eq(expected);
            });
        });

    });

});
