import React from 'react';
import type { Client } from './client';
import { css } from 'styled-components';

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

const fontFaces = css`
  @font-face {
    font-family: 'Poppins';
    src: url('fonts/Poppins-Regular.ttf');
  }

  body {
    height: 100vh;
    margin: 0;
    font-family: Poppins, sans-serif;
    background: linear-gradient(180deg, #98EBEC 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(343.68deg, #3D77A4 -3.36%, rgba(255, 255, 255, 0) 119.22%), #3D77A4;
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
            <style dangerouslySetInnerHTML={{ __html: fontFaces }} type="text/css" media="screen, print" />
            <body>
                <div style={{ height: '100%' }} id={appRoot} dangerouslySetInnerHTML={{ __html: content }} />
                <script
                    type="application/javascript"
                    dangerouslySetInnerHTML={{ __html: `window.${namespace}=${JSON.stringify(config)}` }}
                />
                <script type="application/javascript" src={clientScript} />
            </body>
        </html>
    );
}
