import type { ServerConfig } from '../types';
import { getSSRClient } from '../public/scripts/client';

/**
 *
 * @param config
 * @param apiRoutes
 */
export function getClientView({ config, apiRoutes } : ServerConfig): string {
    const headerScript = config.liveReload();
    const clientScript = config.clientScript();
    const client = getSSRClient({ apiRoutes, headerScript, clientScript });

    return client.renderOnServer(client);
}
