import axios from 'axios';
import sinon from 'sinon';
import { buildConfig } from '../../test/helpers';
import { expect, request } from '../../test/chai';
import { createAppConfig } from '../config';
import { createServer, createServerConfig } from '../server';
import type { GeocoderData, GeocoderResponse } from './models';
import type { GeocoderOptions } from './submitRequest';

describe('Server Census Endpoints Specification', () => {
    let stub;

    before(() => {
        stub = sinon.stub(axios, 'get');
    });

    after(() => {
        stub.restore();
    });

    /**
     *
     */
    const expectedGeocoderConfig = {
        returnTypes: ['locations', 'geographies'],
        returnTypeConfigs: {
            locations: {
                searchTypes: [ 'onelineaddress', 'address' ],
                searchTypeConfigs: {
                    onelineaddress: [ 'address' ],
                    address: [ 'street', 'city', 'state', 'zip' ]
                }
            },
            geographies: {
                searchTypes: [ 'onelineaddress', 'address', 'coordinates' ],
                searchTypeConfigs: {
                    onelineaddress: [ 'address' ],
                    address: [ 'street', 'city', 'state', 'zip' ],
                    coordinates: [ 'x', 'y' ]
                }
            }
        }
    };
    it('should return 200 and a GeocoderConfig for the /census/geocoder/configs route', () => {
        const config = createAppConfig(buildConfig, { NODE_ENV: 'production', SERVER_PORT: '3000' });
        const server = createServer(createServerConfig(config));

        return request(server).get('/api/v1/census/geocoder/configs').then((response) => {
            expect(response).to.have.status(200);
            expect(response.body).to.deep.eq(expectedGeocoderConfig);
        });
    });

    /**
     *
     */
    const geocoderSubmissionOptions: GeocoderOptions = {
        returnType: 'locations',
        searchType: 'onelineaddress',
        configType: [{ name: 'address', value: '1415 Gary Dr. Concord CA 94518' }]
    };
    const emptyGeocoderResponse: GeocoderResponse = {
        result: {
            addressMatches: []
        }
    };
    const emptyGeocoderData: GeocoderData = {
        addresses: []
    };
    it('should return 200 and an empty object when no addresses match for /census/geocoder/submit route', () => {
        stub.returns({ data: emptyGeocoderResponse });

        const config = createAppConfig(buildConfig, { NODE_ENV: 'production', SERVER_PORT: '3000' });
        const server = createServer({ ...createServerConfig(config), request: axios });

        return request(server)
            .post('/api/v1/census/geocoder/submit')
            .send(geocoderSubmissionOptions)
            .then((response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.deep.eq(emptyGeocoderData);
            });
    });

    /**
     *
     */
    const geocoderRequestURL = '' +
        'https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?' +
        'address=1415%20Gary%20Dr.%20Concord%20CA%2094518&benchmark=Public_AR_Census2020&' +
        'vintage=Census2020_Census2020&layers=10&format=json';
    const locationsGeocoderResponse: GeocoderResponse = {
        result: {
            addressMatches: [{
                matchedAddress: '1415 GARY DR. CONCORD CA 94518',
                coordinates: { x: '1', y: '2' },
                addressComponents: {
                    fromAddress: '1410',
                    toAddress: '1415',
                    streetName: 'Gary',
                    suffixType: 'Dr.',
                    city: 'Concord',
                    state: 'CA',
                    zip: '94518'
                }
            }]
        }
    };
    const locationsGeocoderData: GeocoderData = {
        addresses: [{
            address: {
                city: 'Concord',
                from: '1410',
                state: 'CA',
                street: 'Gary',
                streetType: 'Dr.',
                to: '1415',
                zip: '94518'
            },
            censusBlocks: [],
            coordinates: { x: '1', y: '2' },
            matched: '1415 GARY DR. CONCORD CA 94518'
        }]
    };
    it('should return 200 and an object containing matched addresses for /census/geocoder/submit route', () => {
        stub.returns({ data: locationsGeocoderResponse });

        const config = createAppConfig(buildConfig, { NODE_ENV: 'production', SERVER_PORT: '3000' });
        const server = createServer({ ...createServerConfig(config), request: axios });

        return request(server)
            .post('/api/v1/census/geocoder/submit')
            .send(geocoderSubmissionOptions)
            .then((response) => {
                expect(stub.firstCall.firstArg).to.be.eq(geocoderRequestURL);
                expect(response).to.have.status(200);
                expect(response.body).to.deep.eq(locationsGeocoderData);
            });
    });

    /**
     *
     */
    const geographiesGeocoderResponse: GeocoderResponse = {
        result: {
            addressMatches: [{
                matchedAddress: '1415 GARY DR. CONCORD CA 94518',
                coordinates: { x: '1', y: '2' },
                addressComponents: {
                    fromAddress: '1410',
                    toAddress: '1415',
                    streetName: 'Gary',
                    suffixType: 'Dr.',
                    city: 'Concord',
                    state: 'CA',
                    zip: '94518'
                },
                geographies: { 'Census Blocks': [{ TRACT: '123456' }] }
            }]
        }
    };
    const geographiesGeocoderData: GeocoderData = {
        addresses: [{
            address: {
                city: 'Concord',
                from: '1410',
                state: 'CA',
                street: 'Gary',
                streetType: 'Dr.',
                to: '1415',
                zip: '94518'
            },
            censusBlocks: [{ tract: '123456' }],
            coordinates:  { x: '1', y: '2' },
            matched: '1415 GARY DR. CONCORD CA 94518'
        }]
    };

    it('should return 200 and an object including geographies for /census/geocoder/submit route', () => {
        stub.returns({ data: geographiesGeocoderResponse });

        const config = createAppConfig(buildConfig, { NODE_ENV: 'production', SERVER_PORT: '3000' });
        const server = createServer({ ...createServerConfig(config), request: axios });

        return request(server)
            .post('/api/v1/census/geocoder/submit')
            .send(geocoderSubmissionOptions)
            .then((response) => {
                expect(stub.firstCall.firstArg).to.be.eq(geocoderRequestURL);
                expect(response).to.have.status(200);
                expect(response.body).to.deep.eq(geographiesGeocoderData);
            });
    });
});
