import React from 'react';
import { HtmlProps } from '../types';

/**
 *
 * @param clientConfig
 * @param headerScripts
 * @param content
 * @param clientScript
 */
export default function Html({ config, headerScript, content, clientScript }: HtmlProps): JSX.Element {
    return (
        <html lang="en">
            <head>
                <title>{config.title}</title>
                {headerScript && <script type="application/javascript" src={headerScript} />}
            </head>
            <body>
                <div id={config.appRoot} dangerouslySetInnerHTML={{ __html: content }} />
                <script
                    type="application/javascript"
                    dangerouslySetInnerHTML={{ __html: `window.${config.namespace}=${JSON.stringify(config)}` }}
                />
                <script type="application/javascript" src={clientScript} />
            </body>
        </html>
    );
}
