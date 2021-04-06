import React from 'react';
import ReactDOM from 'react-dom';
import { createClientConfig } from './config';

/**
 *
 */
const configFromServer = window['__client_config__'];

delete window['__client_config__'];

const config = createClientConfig(configFromServer);

ReactDOM.hydrate(<config.App config={config} />, window.document.getElementById(config.appRoot));
