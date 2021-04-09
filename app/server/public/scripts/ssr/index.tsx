import React from 'react';
import type { Client } from '../types';

interface HtmlProps {
    client: Client;
    content: string;
}

/**
 *
 * @param client
 * @param content
 */
export function Html({ client, content }: HtmlProps): JSX.Element {
    const { config, renderConfig } = client;
    const { title, appRoot, namespace, headerScript, clientScript } = renderConfig;

    return (
        <html lang="en">
            <head>
                <title>{title}</title>
                {headerScript && <script type="application/javascript" src={headerScript} />}
            </head>
            <body>
                <div id={appRoot} dangerouslySetInnerHTML={{ __html: content }} />
                <script
                    type="application/javascript"
                    dangerouslySetInnerHTML={{ __html: `window.${namespace}=${JSON.stringify(config)}` }}
                />
                <script type="application/javascript" src={clientScript} />
            </body>
        </html>
    );
}
