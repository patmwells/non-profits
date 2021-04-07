import type React from 'react';
import type { AxiosStatic } from 'axios';

/**
 *
 */
export interface ClientApiRoutes {
    geocoderConfigs: string;
}

/**
 *
 */
export interface HtmlProps {
    config: {
        title: string;
        appRoot: string;
        namespace: string;
        apiRoutes: ClientApiRoutes;
    };
    headerScript: string;
    content: string;
    clientScript: string;
}

/**
 *
 */
export interface ClientConfig {
    App: React.FunctionComponent<{ config: ClientConfig }>;
    Html: React.FunctionComponent<HtmlProps>;
    appRoot: string;
    title: string;
    namespace: string;
    apiRoutes: ClientApiRoutes;
    request: AxiosStatic;
    fetchGeocoderConfig: (config: ClientConfig) => Promise<unknown>;
}
