import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { getClientConfigFromWindow } from '../common/clientConfig';

const clientConfig = getClientConfigFromWindow(window);

ReactDOM.hydrate(<App />, document.getElementById(clientConfig.appRoot));