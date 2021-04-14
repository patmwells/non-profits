import type { Client } from '../client';
import type { ClientApi, GeocoderConfigs } from './types';

/**
 *
 */
export type createClientApi = typeof createClientApi;

/**
 *
 */
class Api implements ClientApi {
    private request;
    private routes;

    /**
     *
     * @param request
     * @param routes
     */
    constructor(request, routes) {
        this.request = request;
        this.routes = routes;
    }

    /**
     *
     */
    async getGeocoderConfigs(): Promise<GeocoderConfigs> {
        const response = await this.request.get(this.routes.geocoderConfigs);

        return response.data;
    }

}

/**
 *
 * @param request
 * @param routes
 */
export function createClientApi({ request, config }: Client): ClientApi {
    return new Api(request, config.apiRoutes);
}
