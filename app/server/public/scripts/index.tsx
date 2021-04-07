import React from 'react';
import ReactDOM from 'react-dom';
import { getClientConfigFromWindow } from './config';

/**
 *
 */
const config = getClientConfigFromWindow(window);

ReactDOM.hydrate(<config.App config={config} />, window.document.getElementById(config.appRoot));
