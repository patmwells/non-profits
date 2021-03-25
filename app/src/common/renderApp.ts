import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import App from './components';
import { createClientConfig, getAppRoot } from '../client/config';

/**
 *
 */
export const ConfigNamespace = '__client_config__';

/**
 *
 */
export function renderAppOnServer(): string {
    const app = App();
    const config = createClientConfig();
    const rendered = ReactDOMServer.renderToString(app);

    return `
        <div id=${getAppRoot(config)}>${rendered}</div>
        <script type="application/javascript">
            window.${ConfigNamespace}=${JSON.stringify(config)}
        </script>
    `;
}

/**
 *
 * @param window
 */
export function renderAppOnClient(window: Window): void {
    const config = window[ConfigNamespace];
    delete window[ConfigNamespace];

    const appRoot = getAppRoot(config);
    const app = App();

    ReactDOM.hydrate(app, window.document.getElementById(appRoot));
}