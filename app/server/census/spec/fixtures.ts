import type { GeocoderData, GeocoderOptions, GeocoderResponse } from '@server/census';

/**
 *
 */
export const expectedGeocoderConfig = {
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

/**
 *
 */
export const geocoderSubmissionOptions: GeocoderOptions = {
    returnType: 'locations',
    searchType: 'onelineaddress',
    configType: [{ name: 'address', value: '1415 Gary Dr. Concord CA 94518' }]
};

/**
 *
 */
export const geocoderRequestURL = 'https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?' +
    'address=1415%20Gary%20Dr.%20Concord%20CA%2094518&benchmark=Public_AR_Census2020&' +
    'vintage=Census2020_Census2020&layers=10&format=json';

/**
 *
 */
export const emptyGeocoderResponse: GeocoderResponse = {
    result: {
        addressMatches: []
    }
};

/**
 *
 */
export const locationsGeocoderResponse: GeocoderResponse = {
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

/**
 *
 */
export const geographiesGeocoderResponse: GeocoderResponse = {
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

/**
 *
 */
export const emptyGeocoderData: GeocoderData = {
    addresses: []
};

/**
 *
 */
export const locationsGeocoderData: GeocoderData = {
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

/**
 *
 */
export const geographiesGeocoderData: GeocoderData = {
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
