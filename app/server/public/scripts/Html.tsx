import React from 'react';
import { css } from 'styled-components';
import type { Client } from './client';

/**
 *
 */
export type Html = typeof Html;

/**
 *
 */
interface HtmlProps {
    client: Client;
    content: string;
}

const globalStyles = css`
  @font-face {
    font-family: 'Poppins';
    src: url('fonts/Poppins-Regular.ttf');
  }

  body {
    height: 100vh;
    margin: 0;
    font-family: sans-serif;
    background: #e2e2e2;
  }

  button:focus {
    outline: none;
  }
`;

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
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <head>
                <title>{title}</title>
                {headerScript && <script type="application/javascript" src={headerScript} />}
            </head>
            <style dangerouslySetInnerHTML={{ __html: globalStyles }} type="text/css" media="screen, print" />
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
