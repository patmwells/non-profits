import React from 'react';
import { HtmlProps } from '../types';

/**
 *
 * @param renderConfig
 * @param headerScripts
 * @param content
 * @param clientScript
 */
export default function Html({ renderConfig, headerScript, content, clientScript }: HtmlProps): JSX.Element {
    return (
        <html lang="en">
            <head>
                <title>{renderConfig.title}</title>
                {headerScript && <script type="application/javascript" src={headerScript} />}
            </head>
            <body>
                <div id={renderConfig.appRoot} dangerouslySetInnerHTML={{ __html: content }} />
                <script
                    type="application/javascript"
                    dangerouslySetInnerHTML={{
                        __html: `window.${renderConfig.namespace}=${JSON.stringify(renderConfig)}`
                    }}
                />
                <script type="application/javascript" src={clientScript} />
            </body>
        </html>
    );
}
