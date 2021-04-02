import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../public/scripts/components';

/**
 *
 */
export function getSSRContent(): string {
    return ReactDOMServer.renderToString(<App />);
}