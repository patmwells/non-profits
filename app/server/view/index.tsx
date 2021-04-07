import React from 'react';
import ReactDOMServer from 'react-dom/server';
import type { ServerConfig } from '../types';
import { createClientConfig  } from '../public/scripts/config';

/**
 *
 * @param server
 */
export function getSSRPage(server: ServerConfig): string {
    const liveReload = server.config.liveReload();
    const clientScript = server.config.clientScript();
    const clientConfig = createClientConfig(server.apiRoutes);

    /**
     *
     */
    const app = <clientConfig.App config={clientConfig} />;
    const content = ReactDOMServer.renderToString(app);

    /**
     *
     */
    const { appRoot, title, namespace, apiRoutes } = clientConfig;
    const renderProps = {
        config: {
            appRoot,
            title,
            namespace,
            apiRoutes
        },
        headerScript: liveReload,
        content,
        clientScript
    };
    const html = <clientConfig.Html {...renderProps} />;

    return `<!DOCTYPE html>${ReactDOMServer.renderToStaticMarkup(html)}`;
}
