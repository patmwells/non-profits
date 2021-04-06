// https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.pdf
// https://geocoding.geo.census.gov/geocoder/benchmarks
// https://geocoding.geo.census.gov/geocoder/geographies/address?benchmark=Public_AR_Census2020&vintage=Census2020_Census2020&layers=10&format=json

import type { GeocoderConfigs } from '../types';

const options = {
    getGeographiesReturnType: () => 'geographies',
    getLocationsReturnType: () => 'locations',
    getBenchmark: () => 'Public_AR_Current',
    getVintage: () => 'Current_Current',
    getOneLineAddressSearchType: () => 'onelineaddress',
    getAddressSearchType: () => 'address',
    getCoordinatesSearchType: () => 'coordinates',
};

const geographies = {
    returntype: options.getGeographiesReturnType(),
    searchtype: [
        options.getOneLineAddressSearchType(),
        options.getAddressSearchType(),
        options.getCoordinatesSearchType()
    ]
};

const locations = {
    returntype: options.getLocationsReturnType(),
    searchtype: [
        options.getOneLineAddressSearchType(),
        options.getAddressSearchType()
    ]
};

/**
 *
 */
export function getGeocoderConfigs(): GeocoderConfigs[] {
    return [
        geographies,
        locations
    ];
}