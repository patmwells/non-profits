import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './scripts/components/App';
import config from './config';

export default function html(): string {
    const page = (
        <html lang="en">
            <head>
                <title>One Concord</title>
                {config.HEADER_SCRIPTS.map((script, index) => <script key={index} src={script} />)}
            </head>
            <body>
                <div id="root">
                    <App />
                </div>
                <script src={config.CLIENT_SCRIPT} />
            </body>
        </html>
    );

    return ReactDOMServer.renderToString(page);
}