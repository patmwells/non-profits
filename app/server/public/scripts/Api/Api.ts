import type { GeocoderConfig, GeocoderOptions, GeocoderData } from '@server/census';
import type { Client } from '../client';

/**
 *
 */
export interface ClientApi {
    getGeocoderConfigs: () => Promise<GeocoderConfig>;
    submitGeocoderRequest: (options: GeocoderOptions) => Promise<GeocoderData>;
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
    async submitGeocoderRequest(options: GeocoderOptions): Promise<GeocoderData> {
        const response = await this.request.post(this.routes.submitGeocoder, options);

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
