import type { GeocoderData } from './models';
import { GeocoderConfig, getGeocoderConfigs } from './getConfigs';
import { GeocoderOptions, submitGeocoderRequest } from './submitRequest';

export { GeocoderData } from './models';
export { GeocoderConfig } from './getConfigs';
export { GeocoderOptions } from './submitRequest';

/**
 *
 */
export interface CensusGeocoder {
    getConfigs: () => GeocoderConfig;
    submitRequest: (options: GeocoderOptions) => Promise<GeocoderData>;
}

/**
 *
 */
export const CensusGeocoder: CensusGeocoder = {
    getConfigs: getGeocoderConfigs,
    submitRequest: submitGeocoderRequest
};
