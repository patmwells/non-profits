import type { Provider } from 'react';
import type { ClientApi, GeocoderConfig } from '../Api';
import type { State, StoreInterface } from './store';
import type { Requests } from './request';
import { StoreProvider, getStore } from './store';
import { AsyncDataLoader } from './AsyncDataLoader';
import { createRequests, useDataRequest } from './request';

/**
 *
 */
export type createStore = typeof createStore;

/**
 *
 */
export interface StoreController {
    requests: Requests;
    Provider: Provider<StoreInterface>;
    AsyncDataLoader: AsyncDataLoader;
    getStore: getStore;
    useGeocoderConfigs: typeof useGeocoderConfigs;
}

/**
 *
 */
export type GeocoderConfigState = State<GeocoderConfig[]>;

/**
 *
 * @param store
 */
function useGeocoderConfigs(store: StoreController): GeocoderConfigState {
    const request = store.requests.geocoderConfigs();

    return useDataRequest(request);
}

/**
 *
 * @param api
 */
export function createStore(api: ClientApi): StoreController {
    const requests = createRequests(api);

    return {
        requests,
        Provider: StoreProvider,
        AsyncDataLoader,
        getStore,
        useGeocoderConfigs
    };
}
