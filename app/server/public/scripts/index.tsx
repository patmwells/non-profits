import React from 'react';
import ReactDOM from 'react-dom';
import App from './components';

/**
 *
 */
function run() {
    const config = window['__client_config__'];

    delete window['__client_config__'];

    ReactDOM.hydrate(<App />, window.document.getElementById(config.appRoot));
}

/**
 *
 */
run();