import type { ServerConfig } from '../server';
import { createClient, getSSRClientConfig } from '../public/scripts/client';

/**
 *
 */
export type getClientView = typeof getClientView;

/**
 *
 * @param config
 * @param apiRoutes
 */
export function getClientView({ config, apiRoutes } : ServerConfig): string {
    const headerScript = config.liveReload();
    const clientScript = config.clientScript();
    const client = createClient(getSSRClientConfig({ apiRoutes, headerScript, clientScript }));

    return client.renderOnServer(client);
}
