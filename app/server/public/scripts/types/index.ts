import type React from 'react';
import type { AxiosStatic } from 'axios';

/**
 *
 */
interface ClientApiRoutes {
    geocoderConfigs: string;
}

/**
 *
 */
export interface ClientConfig {
    App: React.FunctionComponent<{ config: ClientConfig }>;
    appRoot: string;
    apiRoutes: ClientApiRoutes;
    request: AxiosStatic;
    fetchGeocoderConfig: (config: ClientConfig) => Promise<unknown>;
}
