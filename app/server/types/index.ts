import { Client } from '../config';

export interface Server {
    assets: () => string;
    clientAppRoot: () => string;
    clientConfigNamespace: () => string;
    clientScript: () => string;
    clientConfig: () => Client;
    isDevelopment: () => boolean;
    liveReload: () => string;
    port: () => string;
    title: () => string;
    getSSRContent: () => string;
    getPageHTML: (server: Server) => string;
}