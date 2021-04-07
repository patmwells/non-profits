import type { ServerConfig } from '../types';
import { createClientConfig } from '../public/scripts/config';

/**
 *
 * @param server
 */
export function getSSRPage(server: ServerConfig): string {
    const headerScript = server.config.liveReload();
    const clientScript = server.config.clientScript();
    const config = createClientConfig(server.apiRoutes);

    return config.getSSRPage({ config, headerScript, clientScript });
}
