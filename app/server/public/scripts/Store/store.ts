import React, { Dispatch, useContext, useReducer } from 'react';
import { AsyncStatus } from './AsyncDataLoader';

/**
 *
 */
const storeContext = React.createContext(null);
export const StoreProvider = storeContext.Provider;

/**
 *
 */
export enum Actions {
    FETCH_GEOCODER_CONFIGS = 'FETCH_GEOCODER_CONFIGS'
}

/**
 *
 */
interface Action extends State {
    type: Actions;
}

/**
 *
 */
export interface StoreInterface {
    dispatch: Dispatch<Action>;
    state: StoreState;
}

/**
 *
 */
export interface StoreState {
    [Actions.FETCH_GEOCODER_CONFIGS]: State;
}

/**
 *
 */
export interface State<T = unknown> {
    status: AsyncStatus;
    data?: T;
    error?: Error;
}

/**
 *
 * @param state
 * @param action
 */
function reducer(state: State, action: Action): StoreState {
    const { type, status, data, error } = action;

    return { ...state, [type]: { status, data, error } };
}

/**
 *
 */
function getInitialState(): StoreState {
    return {
        [Actions.FETCH_GEOCODER_CONFIGS]: { status: null, data: null, error: null }
    };
}

/**
 *
 */
export function getStore(): StoreInterface {
    const [state, dispatch] = useReducer(reducer, getInitialState(), undefined);

    return { state, dispatch };
}

/**
 *
 */
export function useStore(): StoreInterface {
    return useContext(storeContext);
}

/**
 *
 */
export function useSelector<T>(selector: (state: StoreState) => T): T {
    const store = useStore();

    return selector(store.state);
}
