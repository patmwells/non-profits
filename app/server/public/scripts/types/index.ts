import type React from 'react';
import type { AxiosStatic } from 'axios';
import type { ApiRoutesType } from '../../../types/routes';

export interface ClientConfig {
    App: React.FunctionComponent<{ config: ClientConfig }>;
    appRoot: string;
    apiRoutes: ApiRoutesType;
    request: AxiosStatic;
    fetchGeocoderConfig: (config: ClientConfig) => Promise<unknown>;
}
