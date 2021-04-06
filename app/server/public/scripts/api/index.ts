import { ClientConfig } from '../types';

/**
 *
 * @param config
 */
export async function fetchGeocoderConfig(config: ClientConfig): Promise<unknown> {
    const response = await config.request.get(config.apiRoutes.geocoderConfigs);

    return response.data;
}
