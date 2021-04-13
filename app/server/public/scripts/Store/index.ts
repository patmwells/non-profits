import React, { Dispatch, Provider, useContext, useEffect, useReducer } from 'react';
import type { AppController } from '../App';
import { AsyncDataLoader, AsyncStatus } from './AsyncDataLoader';

/**
 *
 */
export interface Store {
    Provider: Provider<StoreInterface>;
    AsyncDataLoader: AsyncDataLoader;
    createStore: typeof createStore;
    useGeocoderConfigs: typeof useGeocoderConfigs;
}

/**
 *
 */
const storeContext = React.createContext(null);

/**
 *
 */
const Provider = storeContext.Provider;

/**
 *
 */
enum Actions {
    FETCH_GEOCODER_CONFIGS = 'FETCH_GEOCODER_CONFIGS'
}

/**
 *
 */
interface StateSlice {
    status: AsyncStatus;
    data?: unknown;
    error?: Error;
}

/**
 *
 */
interface State {
    [Actions.FETCH_GEOCODER_CONFIGS]: StateSlice;
}

/**
 *
 */
interface Action extends StateSlice {
    type: string;
    key: Actions;
}

/**
 *
 */
interface StoreInterface {
    dispatch: Dispatch<Action>;
    state: State;
}

/**
 *
 */
interface AsyncRequest {
    type: Actions;
    request: () => Promise<unknown>;
}

/**
 *
 * @param state
 * @param action
 */
function reducer(state: State, action: Action): State {
    const { key, status, data, error } = action;

    return {
        ...state,
        [key]: { status, data, error }
    };
}

/**
 *
 */
function getInitialState(): State {
    return {
        [Actions.FETCH_GEOCODER_CONFIGS]: { status: null, data: null, error: null }
    };
}

/**
 *
 */
function createStore(): StoreInterface {
    const [state, dispatch] = useReducer(reducer, getInitialState());

    return { state, dispatch };
}

/**
 *
 */
function useDispatch(): (action: AsyncRequest) => void {
    const { dispatch } = useContext<StoreInterface>(storeContext);

    return function ({ type, request }: AsyncRequest): void {
        dispatch({ type: `${type}_PENDING`, key: type, status: AsyncStatus.pending });

        request().then(data => {
            dispatch({ type: `${type}_SUCCESS`, key: type, status: AsyncStatus.success, data });
        }).catch((error) => {
            dispatch({ type: `${type}_FAILED`, key: type, status: AsyncStatus.failed, error });
        });
    };
}

/**
 *
 * @param selector
 */
function useSelector<T>(selector: (state: State) => T): T {
    const store = useContext<StoreInterface>(storeContext);

    return selector(store.state);
}

/**
 *
 * @param state
 */
function selectGeocoderConfigs(state: State): StateSlice {
    return state[Actions.FETCH_GEOCODER_CONFIGS];
}

/**
 *
 * @param api
 */
function useGeocoderConfigs({ api }: AppController): StateSlice {
    const dispatch = useDispatch();
    const result = useSelector(selectGeocoderConfigs);

    useEffect(() => {
        if (result.status) {
            return;
        }

        dispatch({
            type: Actions.FETCH_GEOCODER_CONFIGS,
            request: (): Promise<unknown> => api.getGeocoderConfigs()
        });

    }, [result]);

    return result;
}

/**
 *
 */
export const Store: Store = {
    Provider,
    AsyncDataLoader,
    createStore,
    useGeocoderConfigs
};
