import React from 'react';
import ReactDOMServer from 'react-dom/server';
import type { ClientConfig } from '../types';
import { createClientConfig } from '../public/scripts/config';

/**
 *
 */
export function getSSRContent(clientConfig: ClientConfig): string {
    const config = createClientConfig(clientConfig);

    return ReactDOMServer.renderToString(<config.App config={config} />);
}
