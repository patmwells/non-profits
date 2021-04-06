import axios from 'axios';
import App from './components';
import { ClientConfig as ClientConfigFromServer } from '../../types';
import { ClientConfig } from './types';
import { fetchGeocoderConfig } from './api';

/**
 *
 * @param config
 */
export function createClientConfig(config: ClientConfigFromServer): ClientConfig {
    return {
        App,
        appRoot: config.appRoot,
        apiRoutes: config.apiRoutes,
        request: axios,
        fetchGeocoderConfig
    };
}
