import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { AppConfig, getHtml } from '../config';
import App from '../../client/components/App';

/**
 *
 * @param config
 */
export function render(config: AppConfig): string {
    const content = ReactDOMServer.renderToString(<App />);

    return getHtml(config, content);
}