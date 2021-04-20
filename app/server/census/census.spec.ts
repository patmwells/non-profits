import sinon from 'sinon';
import axios from 'axios';
import { TestConfig } from '../spec';

const { expect, request, setup, fixtures } = TestConfig;

describe('Census Integration Specification', () => {
    const stub = sinon.stub(axios);

    it('should return 200 and a GeocoderConfig for the /census/geocoder/configs route', async () => {
        const server = setup({ env: { NODE_ENV: 'production', SERVER_PORT: '3000' } });
        const response = await request(server).get('/api/v1/census/geocoder/configs');

        expect(response).to.have.status(200);
        expect(response.body).to.deep.eq(fixtures.census.geocoderConfig);
    });

    it('should return 200 and an empty object when no addresses match for /census/geocoder/submit route', async () => {
        stub.get.returns({ data: fixtures.census.emptyGeocoderData });

        const server = setup({ env: { NODE_ENV: 'production', SERVER_PORT: '3000' }, config: { request: stub } });
        const response = await request(server)
            .post('/api/v1/census/geocoder/submit')
            .send(fixtures.census.geocoderSubmissionOptions);

        expect(response).to.have.status(200);
        expect(response.body).to.deep.eq(fixtures.census.emptyGeocoderData);
    });

    it('should return 200 and an object containing matched addresses for /census/geocoder/submit route', async () => {
        stub.get.returns({ data: fixtures.census.locationsGeocoderResponse });

        const server = setup({ env: { NODE_ENV: 'production', SERVER_PORT: '3000' }, config: { request: stub } });
        const response = await request(server)
            .post('/api/v1/census/geocoder/submit')
            .send(fixtures.census.geocoderSubmissionOptions);

        expect(stub.get.firstCall.firstArg).to.be.eq(fixtures.census.geocoderRequestURL);
        expect(response).to.have.status(200);
        expect(response.body).to.deep.eq(fixtures.census.locationsGeocoderData);
    });

    it('should return 200 and an object including geographies for /census/geocoder/submit route', async () => {
        stub.get.returns({ data: fixtures.census.geographiesGeocoderResponse });

        const server = setup({ env: { NODE_ENV: 'production', SERVER_PORT: '3000' }, config: { request: stub } });
        const response = await request(server)
            .post('/api/v1/census/geocoder/submit')
            .send(fixtures.census.geocoderSubmissionOptions);

        expect(stub.get.firstCall.firstArg).to.be.eq(fixtures.census.geocoderRequestURL);
        expect(response).to.have.status(200);
        expect(response.body).to.deep.eq(fixtures.census.geographiesGeocoderData);
    });

});
