import React from 'react';
import ReactDOMServer from 'react-dom/server';
import config from './config';
import App from '../client/components/App';

const initialState = {
    clientRootId: config.CLIENT_ROOT_ID,
    clientStateId: config.CLIENT_STATE_ID
};

export default function html(): string {
    const serialized = JSON.stringify(initialState);

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
                    dangerouslySetInnerHTML={{ __html: `window.INITIAL_STATE = ${serialized};` }}
                />
                <script src={config.CLIENT_SCRIPT} />
            </body>
        </html>
    );

    return ReactDOMServer.renderToString(page);
}