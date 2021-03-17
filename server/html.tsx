import React from 'react';
import ReactDOMServer from 'react-dom/server';
import config from './config';
import App from './scripts/components/App';

import type { InitialState } from './types/initialState';

export default function html(): string {
    const initialState = `window.INITIAL_STATE = ${JSON.stringify({
        clientRootId: config.CLIENT_ROOT_ID,
        clientStateId: config.CLIENT_STATE_ID
    } as InitialState)};`;

    const page = (
        <html lang="en">
            <head>
                <title>App</title>
                {config.HEADER_SCRIPTS.map((script, index) => <script key={index} src={script} />)}
            </head>
            <body>
                <div id={config.CLIENT_ROOT_ID}>
                    <App />
                </div>
                <script
                    id={config.CLIENT_STATE_ID}
                    dangerouslySetInnerHTML={{ __html: initialState }}
                />
                <script src={config.CLIENT_SCRIPT} />
            </body>
        </html>
    );

    return ReactDOMServer.renderToString(page);
}