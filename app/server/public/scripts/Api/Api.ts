import type { GeocoderConfig, GeocoderOptions } from '@server/census';
import type { Client } from '../client';

/**
 *
 */
export type createClientApi = typeof createClientApi;

/**
 *
 */
export interface ClientApi {
    getGeocoderConfigs: () => Promise<GeocoderConfig>;
    submitGeocoderOptions: (options: GeocoderOptions) => Promise<void>;
}

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
    async getGeocoderConfigs(): Promise<GeocoderConfig> {
        const response = await this.request.get(this.routes.geocoderConfigs);

        return response.data;
    }

    /**
     *
     * @param options
     */
    async submitGeocoderOptions(options: GeocoderOptions): Promise<void> {
        await this.request.post(this.routes.submitGeocoder, options);
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
