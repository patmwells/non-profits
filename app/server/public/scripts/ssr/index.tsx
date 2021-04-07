import React from 'react';
import ReactDOMServer from 'react-dom/server';
import type { SSRPageOptions } from '../types';

/**
 *
 * @param config
 * @param headerScript
 * @param clientScript
 */
export function getSSRPage({ config, headerScript, clientScript }: SSRPageOptions): string {
    const { App, Html, appRoot, title, namespace, apiRoutes } = config;

    /**
     *
     */
    const app = <App config={config} />;
    const content = ReactDOMServer.renderToString(app);

    /**
     *
     */
    const renderConfig = { appRoot, title, namespace, apiRoutes };
    const html = (
        <Html
            renderConfig={renderConfig}
            headerScript={headerScript}
            content={content}
            clientScript={clientScript}
        />
    );
    const markup = ReactDOMServer.renderToStaticMarkup(html);

    return `<!DOCTYPE html>${markup}`;
}
