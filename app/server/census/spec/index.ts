import sinon from 'sinon';
import axios from 'axios';
import type { TestConfig } from '@server/spec';
import {
    emptyGeocoderData,
    emptyGeocoderResponse,
    expectedGeocoderConfig,
    geocoderRequestURL,
    geocoderSubmissionOptions,
    geographiesGeocoderData,
    geographiesGeocoderResponse,
    locationsGeocoderData,
    locationsGeocoderResponse
} from './fixtures';

/**
 *
 * @param request
 * @param expect
 * @param setup
 */
export function census({ request, expect, setup }: TestConfig): void {
    const stub = sinon.stub(axios);

    it('should return 200 and a GeocoderConfig for the /census/geocoder/configs route', () => {
        const server = setup({ env: { NODE_ENV: 'production', SERVER_PORT: '3000' } });

        return request(server).get('/api/v1/census/geocoder/configs').then((response) => {
            expect(response).to.have.status(200);
            expect(response.body).to.deep.eq(expectedGeocoderConfig);
        });
    });

    it('should return 200 and an empty object when no addresses match for /census/geocoder/submit route', () => {
        stub.get.returns({ data: emptyGeocoderResponse });

        const server = setup({
            env: { NODE_ENV: 'production', SERVER_PORT: '3000' },
            config: { request: stub }
        });

        return request(server)
            .post('/api/v1/census/geocoder/submit')
            .send(geocoderSubmissionOptions)
            .then((response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.deep.eq(emptyGeocoderData);
            });
    });

    it('should return 200 and an object containing matched addresses for /census/geocoder/submit route', () => {
        stub.get.returns({ data: locationsGeocoderResponse });

        const server = setup({
            env: { NODE_ENV: 'production', SERVER_PORT: '3000' },
            config: { request: stub }
        });

        return request(server)
            .post('/api/v1/census/geocoder/submit')
            .send(geocoderSubmissionOptions)
            .then((response) => {
                expect(stub.get.firstCall.firstArg).to.be.eq(geocoderRequestURL);
                expect(response).to.have.status(200);
                expect(response.body).to.deep.eq(locationsGeocoderData);
            });
    });

    it('should return 200 and an object including geographies for /census/geocoder/submit route', () => {
        stub.get.returns({ data: geographiesGeocoderResponse });

        const server = setup({
            env: { NODE_ENV: 'production', SERVER_PORT: '3000' },
            config: { request: stub }
        });

        return request(server)
            .post('/api/v1/census/geocoder/submit')
            .send(geocoderSubmissionOptions)
            .then((response) => {
                expect(stub.get.firstCall.firstArg).to.be.eq(geocoderRequestURL);
                expect(response).to.have.status(200);
                expect(response.body).to.deep.eq(geographiesGeocoderData);
            });
    });

}
