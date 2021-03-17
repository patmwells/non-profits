import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import type { InitialState } from '../types/initialState';

interface InitialWindow extends Window {
    INITIAL_STATE: InitialState;
}

declare const window: InitialWindow;

const initialState = window.INITIAL_STATE;

delete window.INITIAL_STATE;

const initialStateScript = document.getElementById(initialState.clientStateId);

if (initialStateScript) {
    initialStateScript.parentNode.removeChild(initialStateScript);
}

ReactDOM.hydrate(<App />, document.getElementById(initialState.clientRootId));